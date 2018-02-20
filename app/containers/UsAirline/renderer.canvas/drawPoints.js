const drawPoints = (nodes, context) => {
  context.save();
  context.fillStyle = '#7dde4f';
  context.beginPath();
  for (const d of nodes) {
    context.moveTo(d.x, d.y);
    context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
  }

  context.fill();
  context.restore();
};

export default drawPoints;
