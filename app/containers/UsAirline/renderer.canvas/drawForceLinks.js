import { geoTransform, geoPath } from 'd3-geo';
import ForceWorker from '../worker/ForceWorker';

function projectStream(lon, lat) {
  this.stream.point(lon, lat);
}
const transform = geoTransform({ point: projectStream });

const forceLinks = (nodes, links, context) => {
  const render = (nodes, links) => {
    context.save();
    context.beginPath();
    context.strokeStyle = 'rgba(255, 34, 34, 0.35)';

    const path = geoPath()
      .projection(transform)
      .context(context);

    for (const d of links) {
      path({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [[d.source.x, d.source.y], [d.target.x, d.target.y]],
        },
        properties: {},
      });
    }

    context.stroke();
    context.restore();
  };

  const renderInWorker = ForceWorker(render);
  renderInWorker(nodes, links);
};

export default forceLinks;
