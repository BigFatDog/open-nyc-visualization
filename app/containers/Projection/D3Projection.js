// we calculate the scale given mapbox state (derived from viewport-mercator-project's code)
// to define a d3 projection
import { geoMercator } from 'd3-geo';

const getProjector = map => {
  const bbox = document.body.getBoundingClientRect();
  const center = map.getCenter();
  const zoom = map.getZoom();
  // 512 is hardcoded tile size, might need to be 256 or changed to suit your map config
  const scale = 512 * 0.5 / Math.PI * Math.pow(2, zoom);

  return geoMercator()
    .center([center.lng, center.lat])
    .translate([bbox.width / 2, bbox.height / 2])
    .scale(scale);
};

export default getProjector;
