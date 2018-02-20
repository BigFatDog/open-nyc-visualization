importScripts('https://d3js.org/d3-collection.v1.min.js');
importScripts('https://d3js.org/d3-dispatch.v1.min.js');
importScripts('https://d3js.org/d3-quadtree.v1.min.js');
importScripts('https://d3js.org/d3-timer.v1.min.js');
importScripts('https://d3js.org/d3-force.v1.min.js');

onmessage = function(event) {
  const { nodes, links } = event.data;

  const simulation = d3
    .forceSimulation(nodes)
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink(links).id(d => d.id))
    .force('x', d3.forceX())
    .force('y', d3.forceY())
    .stop();

  // for (
  //   let i = 0,
  //     n = Math.ceil(
  //       Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
  //     );
  //   i < n;
  //   ++i
  // ) {
  //   postMessage({ type: 'tick', progress: i / n });
  //   simulation.tick();
  // }

  postMessage({ type: 'end', nodes, links });
};
