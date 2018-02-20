const configToURL = config => {
  const arr = [];
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      arr.push(key + '=' + config[key]);
    }
  }

  return arr.join('&');
};

export { configToURL };
