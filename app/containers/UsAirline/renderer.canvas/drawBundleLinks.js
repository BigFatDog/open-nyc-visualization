import { line, curveCatmullRom } from 'd3-shape';
import BundleWorker from '../worker/BundleWorker';

const bundleLinks = (nodes, links, context) => {
  const render = (nodes, links) => {
    const d3line = line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(curveCatmullRom.alpha(0.5))
      .context(context);

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255, 34, 34, 0.35)';

    for (let d of links) {
      d3line(d);
    }

    context.stroke();
    context.closePath();
  };

  const renderInWorker = BundleWorker(render);
  renderInWorker(nodes, links);
};

export default bundleLinks;
