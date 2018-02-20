import { json } from 'd3-fetch';
import mapboxProjection from '../../Projection/MapboxProjection';
import DistinctBright from '../color/DistinctBright';

const colorScale = DistinctBright.copy();

const getWorldFlightData = async map => {
  const data = await json('/public/world_flights.json');

  const nodes = data.airports.map((d, i) => {
    const lon = d[3];
    const lat = d[4];

    const proj = mapboxProjection(map, [lon, lat]);

    return {
      id: i,
      airport: d[0],
      city: d[1],
      country: d[2],
      longitude: lon,
      latitude: lat ? lat : 0,
      x: proj[0],
      y: proj[1],
      color: colorScale(d[2]),
    };
  });

  const edges = data.routes.map((d, i) => {
    return {
      id: i,
      source: d[1],
      target: d[2],
      color: DistinctBright(d[1]),
    };
  });

  const stops = colorScale.domain().map(d => [d, colorScale(d)]);

  return { nodes, edges, stops };
};

const reProjectNodes = (nodes, map) => {
  return nodes.map(d => {
    const Proj = mapboxProjection(map, [d.longitude, d.latitude]);
    return {
      ...d,
      x: Proj[0],
      y: Proj[1],
    };
  });
};

export default getWorldFlightData;

export { reProjectNodes };
