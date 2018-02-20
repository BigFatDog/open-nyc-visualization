import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import uuid from 'uuid/v4';

import getRasterSource from './shader/RasterSource';

const NYC_LON = -73.968285;
const NYC_LAT = 40.785091;

class MapContainer extends Component {
  constructor() {
    super();

    this.map = null;
    this.previousId = null;

    this.changeStyle = this.changeStyle.bind(this);

    this.state = {
      mapStyle: 'mapbox://styles/mapbox/dark-v9',
      viewport: {
        latitude: NYC_LAT,
        longitude: NYC_LON,
        zoom: 6,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  }

  componentDidMount() {
    const { latitude, longitude, zoom, bearing, pitch } = this.state.viewport;
    const { mapStyle } = this.state;

    this.map = new mapboxgl.Map({
      container: 'map-container',
      style: mapStyle,
      center: [longitude, latitude],
      zoom,
      bearing,
      pitch,
    });

    const RASTER_SOURCE = 'raster-source-';
    const RASTER_LAYER = 'raster-layer-';

    const addRasterLayer = () => {
      this.previousId = uuid();

      this.map.addSource(
        RASTER_SOURCE + this.previousId,
        getRasterSource(this.map)
      );
      this.map.addLayer({
        id: RASTER_LAYER + this.previousId,
        type: 'raster',
        source: RASTER_SOURCE + this.previousId,
      });
    };

    const removeRasterLayer = () => {
      this.map.removeLayer(RASTER_LAYER + this.previousId);
      this.map.removeSource(RASTER_SOURCE + this.previousId);
    };

    this.map
      .on('style.load', addRasterLayer)
      .on('movestart', removeRasterLayer)
      .on('moveend', addRasterLayer);
  }

  changeStyle(style) {
    this.map.setStyle(style);
  }

  render() {
    return <div id="map-container" className="fitParent" />;
  }
}

export default MapContainer;
