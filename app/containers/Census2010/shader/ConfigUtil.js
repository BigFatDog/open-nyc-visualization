const configToURL = config => {
  const arr = Object.keys(config).map(d => d + '=' + config[d]);
  return arr.join('&');
};

export { configToURL };
