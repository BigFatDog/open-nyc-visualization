import datashader as ds
import datashader.transfer_functions as tf

import dask.dataframe as dd

from datashader.utils import lnglat_to_meters as webm
from flask import Flask, send_file, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

df = dd.io.parquet.read_parquet('./census.snappy.parq')
df = df.persist()

print('-----------------------  head 5 ----------------------')
print(df.head(5))
print('-----------------------  tail 5 ----------------------')
print(df.tail(5))

print('----------------------- data frame statistics ----------------------')
print(df.divisions, df.npartitions, len(df.divisions) )


@app.route('/census')
def serve_image(): #dataset
    # parse params
    print('-------------- server receives request-----------')
    width = int(request.args.get('width'))
    height = int(request.args.get('height'))
    spread = int(request.args.get('spread'))
    xmin = float(request.args.get('xmin'))
    xmax = float(request.args.get('xmax'))
    ymax = float(request.args.get('ymax'))
    ymin = float(request.args.get('ymin'))

    colorw = str(request.args.get('colorw'))
    colorb = str(request.args.get('colorb'))
    colora = str(request.args.get('colora'))
    colorh = str(request.args.get('colorh'))
    coloro = str(request.args.get('coloro'))



    x_range = webm(latitude=ymin, longitude=xmin)
    y_range = webm(latitude=ymax, longitude=xmax)

    cvs = ds.Canvas(plot_width=width,
                    plot_height=height,
                    x_range=(x_range[0], y_range[0]),
                    y_range=(x_range[1], y_range[1]))


    agg = cvs.points(df, 'easting', 'northing', ds.count_cat('race'))

    color_key = {'w': colorw,
                 'b': colorb,
                 'a': colora,
                 'h': colorh,
                 'o': coloro}

    img = tf.shade(agg, color_key=color_key, how='eq_hist')
    img = tf.spread(img, px=spread)
    img_io = img.to_bytesio()
    return send_file(img_io, mimetype='image/png')

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5002)

