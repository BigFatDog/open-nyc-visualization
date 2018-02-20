import React from 'react';
import mapboxgl from 'mapbox-gl';

import getWorldFlightData from './data';

export class WorldFlight extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      zoom: 1,
      maxZoom: 18,
      center: [-74.0059, 40.7128],
    });

    const getPointFeature = d => {
      return {
        type: 'Feature',
        properties: {
          id: d.id,
          city: d.city,
          airport: d.airport,
          country: d.country,
          'marker-color': d.color,
          'marker-symbol': 'rail-metro',
          line: 'blue',
        },
        geometry: {
          type: 'Point',
          coordinates: [d.longitude, d.latitude],
        },
      };
    };

    const LineString = (lon, lat, lon2, lat2) => {
      return {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [[lon, lat], [lon2, lat2]],
        },
      };
    };

    const drawPoints = (nodes, stops) => {
      const geoFeatures = nodes.map(d => getPointFeature(d));

      const geoJSON = {
        type: 'FeatureCollection',
        features: geoFeatures,
      };

      map.addSource('points', {
        type: 'geojson',
        data: geoJSON,
      });

      map.addLayer({
        id: 'veh-incd',
        type: 'circle',
        source: 'points',
        paint: {
          'circle-color': {
            property: 'country',
            type: 'categorical',
            stops,
          },
          'circle-radius': {
            base: 1.75,
            stops: [[12, 2], [22, 180]],
          },
          'circle-opacity': 0.8,
          'circle-blur': 0.5,
        },
      });
    };

    const drawLinks = (nodes, edges, stops) => {
      const feature = edges.map(d => {
        const start = nodes[d.source];
        const end = nodes[d.target];

        const lineGeo = LineString(
          start.longitude,
          start.latitude,
          end.longitude,
          end.latitude
        );
        lineGeo.properties.sourceCountry = start.country;

        return lineGeo;
      });

      const geojson = {
        type: 'FeatureCollection',
        features: feature,
      };

      map.addSource('links', {
        type: 'geojson',
        data: geojson,
      });

      map.addLayer({
        id: 'veh-link',
        type: 'line',
        source: 'links',
        paint: {
          'line-color': {
            property: 'sourceCountry',
            type: 'categorical',
            stops,
          },
          //'line-cap': 'round',
          //'line-join': 'bevel',
          'line-opacity': 0.1,
          //'line-color': 'rgba(255, 0, 0, 0.415)',
          'line-width': 1,
          'line-blur': 0.5,
        },
      });

      map.setFilter('veh-link', ['==', 'sourceCountry', 'United States']);
    };

    map.on('load', async () => {
      const data = await getWorldFlightData(map);
      const { nodes, edges, stops } = data;

      drawPoints(nodes, stops);
      drawLinks(nodes, edges, stops);
    });
  }

  render() {
    return <div id="map" className="fitParent" />;
  }
}

export default WorldFlight;
