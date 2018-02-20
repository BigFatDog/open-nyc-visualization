let worker;

const GeneralWorker = workerPath => render => (nodes, links) => {
  if (worker) worker.terminate();
  worker = new Worker(workerPath);

  worker.postMessage({
    nodes,
    links,
  });

  worker.onmessage = function(event) {
    if (event.data.type === 'end') {
      const { nodes, links } = event.data;
      render(nodes, links);
    }
  };
};

export default GeneralWorker;
