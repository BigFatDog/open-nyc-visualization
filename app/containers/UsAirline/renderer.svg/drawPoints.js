const drawPoints = (nodes, svg) => {
  const updated = svg.selectAll('.mapbox').data(nodes);
  const added = updated.enter();

  added
    .append('circle')
    .attr('class', 'air-node')
    .attr('stroke', '#7dde4f')
    .attr('fill', '#7dde4f')
    .attr('fill-opacity', 0.9)
    .attr('r', 3)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  updated.attr('cx', d => d.x).attr('cy', d => d.y);
};

export default drawPoints;
