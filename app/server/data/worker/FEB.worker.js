importScripts('https://d3js.org/d3.v4.min.js');
importScripts('./d3-ForceEdgeBundling.js');

onmessage = function(event) {
  const { nodes, links } = event.data;
  const fbundling = d3
    .ForceEdgeBundling()
    .nodes(nodes)
    .edges(links);
  const results = fbundling();

  postMessage({ type: 'end', nodes: nodes, links: results });
};
