import mapboxProjection from '../../Projection/MapboxProjection';
import toArray from './toArray';
import { xml } from 'd3-request';

const getAirlineData = async map => {
  return new Promise(function(resolve, reject) {
    xml('/public/airlines.xml', (err, xml) => {
      if (err) {
        reject(err);
      }

      //Transform the XML data into a proper format used by the algorithm
      //raw nodes/edges are not arrays
      const raw_edges = toArray(
        xml.documentElement.getElementsByTagName('edge')
      );
      const raw_nodes = toArray(
        xml.documentElement.getElementsByTagName('node')
      );

      const nodes = raw_nodes.map(d => {
        const key = d.getAttribute('id');
        const name = d.childNodes[3].firstChild.nodeValue;
        const name2 = name.substring(name.indexOf('(') + 1, name.indexOf(')'));
        const arr = name2.split(',');
        const lon = arr[0].substring(5, name.length - 1);
        const lat = arr[1].substring(5, name.length - 1);
        const proj = mapboxProjection(map, [lon, lat]);

        return {
          id: key,
          latitude: lat,
          longitude: lon,
          x: proj[0],
          y: proj[1],
        };
      });

      const edges = raw_edges.map((d, i) => {
        return {
          id: i,
          source: d.getAttribute('source'),
          target: d.getAttribute('target'),
        };
      });

      resolve({ nodes, edges });
    });
  });
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

export default getAirlineData;

export { reProjectNodes };
