import uniq from 'lodash/uniq';
import pullAll from 'lodash/pullAll';

const DllConfig = {
  path: 'node_modules/nyc-vis-dlls',
  exclude: [
    'chalk',
    'compression',
    'cross-env',
    'enhanced-resolve',
    'express',
    'ip',
    'minimist',
    'sanitize.css',
    'mapbox.js'
  ],
  include: [
    'core-js',
    'lodash',
    'eventsource-polyfill',
  ],
};

const entries = (pkg) => {
  const dependencyNames = Object.keys(pkg.dependencies);
  const { exclude, include } = DllConfig;
  const includeDependencies = uniq(dependencyNames.concat(include));

  console.log(exclude);
  console.log(pullAll(includeDependencies, exclude));

  return pullAll(includeDependencies, exclude);
};

export {
  DllConfig,
  entries,
};
