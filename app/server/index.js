import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import ngrokTunnel from 'ngrok';
import logger from './logger';
import argv from './argv';

import websiteProdMiddleware from './middlewares/website-prod';

const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? ngrokTunnel : false;

const app = express();

// node api
app.enable('trust proxy');
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, '/data')));

if (isDev) {
  import('./middlewares/website-dev').then(websiteDevMiddleware => {
    websiteDevMiddleware.default(app);
  });
} else {
  websiteProdMiddleware(app);
}

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const port = argv.port || process.env.PORT || 3012;
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});

process.on('unhandledRejection', error => {
  console.error('unhandledRejection', error);
});

if (module.hot) {
  module.hot.dispose(() => {
    try {
      app.close();
    } catch (error) {
      logger.error(error.stack);
    }
  });

  module.hot.accept();
}
