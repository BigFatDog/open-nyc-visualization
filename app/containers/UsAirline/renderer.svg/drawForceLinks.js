import ForceWorker from '../worker/ForceWorker';

import asLine from '../../WorldFlight/util/asLine';

const forceLinks = (nodes, links, svg) => {
  const render = (nodes, links) => {
    const updated = svg.selectAll('.edge').data(links);
    const added = updated.enter();

    added
      .append('path')
      .attr('d', asLine)
      .attr('class', 'edge')
      .style('stroke-width', 1)
      .style('stroke', '#ff2222')
      .style('fill', 'none')
      .style('stroke-opacity', 0.115);

    updated.attr('opacity', 1).attr('d', asLine);
  };

  const renderInWorker = ForceWorker(render);
  renderInWorker(nodes, links);
};

export default forceLinks;
