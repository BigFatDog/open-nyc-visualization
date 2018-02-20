import { scaleOrdinal } from 'd3-scale';

const DistinctBright = scaleOrdinal().range([
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
]);

const Stops = DistinctBright.domain().map(d => [d, DistinctBright(d)]);

export default DistinctBright;

export { Stops };
