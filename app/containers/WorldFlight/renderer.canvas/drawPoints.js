const drawPoints = (nodes, context) => {
  for (const d of nodes) {
    context.fillStyle = d.color;
    context.beginPath();
    context.moveTo(d.x, d.y);
    context.arc(d.x, d.y, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
};

export default drawPoints;
