// we can use viewport-mercator-project to get projection and unprojection functions
import WebMercatorViewport from 'viewport-mercator-project';

const getProjector = map => {
  const bbox = document.body.getBoundingClientRect();
  const center = map.getCenter();
  const zoom = map.getZoom();
  return new WebMercatorViewport({
    longitude: center.lng,
    latitude: center.lat,
    zoom: zoom,
    width: bbox.width,
    height: bbox.height,
  });
};

export default getProjector;
