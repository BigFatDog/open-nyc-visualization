import { line, curveCatmullRom } from 'd3-shape';
import BundleWorker from '../worker/BundleWorker';

const d3line = line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(curveCatmullRom.alpha(0.5));

const bundleLinks = (nodes, links, svg) => {
  const render = (nodes, links) => {
    const updated = svg.selectAll('.edge').data(links);
    const added = updated.enter();

    added
      .append('path')
      .attr('d', d3line)
      .attr('class', 'edge')
      .style('stroke-width', 1)
      .style('stroke', '#ff2222')
      .style('fill', 'none')
      .style('stroke-opacity', 0.115);

    updated.attr('opacity', 1).attr('d', d3line);
  };

  const renderInWorker = BundleWorker(render);
  renderInWorker(nodes, links);
};

export default bundleLinks;
