import { scaleLinear } from 'd3-scale';
import { interpolateRound } from 'd3-interpolate';
import chroma from 'chroma-js';

const toRGB = hex => chroma(hex).rgb();

import { configToURL } from './ConfigUtil';

const getRasterURL = map => {
  const container = map.getContainer();

  const zoomScale = scaleLinear()
    .domain([map.getMinZoom(), map.getMaxZoom()])
    .range([1, 4])
    .interpolate(interpolateRound);

  const spread = zoomScale(map.getZoom());

  const scale = window.devicePixelRatio;
  const width = container.clientWidth * scale;
  const height = container.clientHeight * scale;

  const bounds = map.getBounds();

  const xmin = bounds.getSouthWest().lng.toString();
  const ymin = bounds.getSouthWest().lat.toString();
  const xmax = bounds.getNorthEast().lng.toString();
  const ymax = bounds.getNorthEast().lat.toString();

  const color = {
    colorw: '#7eb4fd',
    colorb: '#5efd2f',
    colora: '#fc0d1b',
    colorh: '#fda929',
    coloro: '#885a48',
  };

  const rasterConfig = {
    width,
    height,
    xmin,
    ymin,
    xmax,
    ymax,
    spread,
    colorw: 'deepskyblue',
    colorb: 'lime',
    colora: 'red',
    colorh: 'fuchsia',
    coloro: 'yellow',
  };

  return `http://localhost:5002/census?` + configToURL(rasterConfig);
};

const getBoundsCoordinates = map => {
  const bounds = map.getBounds();

  return [
    [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
    [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
    [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
    [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
  ];
};

const getRasterSource = map => ({
  type: 'image',
  url: getRasterURL(map),
  coordinates: getBoundsCoordinates(map),
});

export default getRasterSource;

export { getBoundsCoordinates, getRasterURL };
