// we can project a lonlat coordinate pair using mapbox's built in projection function
import mapboxgl from 'mapbox-gl';

const mapboxProjection = (map, lonlat) => {
  const p = map.project(new mapboxgl.LngLat(lonlat[0], lonlat[1]));
  return [p.x, p.y];
};

export default mapboxProjection;
