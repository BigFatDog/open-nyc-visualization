import { line, curveCatmullRom } from 'd3-shape';
import { color } from 'd3-color';

const drawLinks = (nodes, edges, context) => {
  const d3line = line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(curveCatmullRom.alpha(0.1))
    .context(context);

  for (const d of edges) {
    const source = nodes[d.source];
    const target = nodes[d.target];
    const baseColor = color(d.color);
    baseColor.opacity = 0.1;
    context.strokeStyle = baseColor;
    context.beginPath();
    context.lineWidth = 1;
    d3line([source, target]);

    context.stroke();
    context.closePath();
  }
};

export default drawLinks;
