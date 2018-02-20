/**
 *
 * Trees
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { scaleLinear } from 'd3-scale';
import { json } from 'd3-fetch';
import crossfilter from 'crossfilter2';
import mapboxgl from 'mapbox-gl';
import chroma from 'chroma-js';
import range from 'lodash/range';

export class Trees extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 11,
      pitch: 40,
      minZoom: 3,
      maxZoom: 18,
      center: [-74.0059, 40.7128],
    });

    map.once('style.load', async () => {
      json('public/nyc_pedcyc_collisions_161004.geojson').then(TreeData => {
        const geoFeatures = crossfilter(TreeData.features);

        const colorScale = scaleLinear().range(['#addd8e', '#31a354']);
        const dim = geoFeatures.dimension(d => d.properties.CYC_INJ);

        const _s = dim.bottom(1)[0].properties.CYC_INJ;
        const _t = dim.top(1)[0].properties.CYC_INJ;

        colorScale.domain([_s, _t]);

        const radiusScale = scaleLinear()
          .domain([_s, _t])
          .range([1, 18]);

        const stops = range(_s, _t, 1).map(d => [
          d,
          chroma(colorScale(d)).hex(),
        ]);
        const radiusStops = range(_s, _t, 1).map(d => [d, radiusScale(d)]);

        map.addSource('veh-incidents', {
          type: 'geojson',
          data: TreeData,
        });

        map.addLayer(
          {
            id: 'veh-incd',
            type: 'circle',
            source: 'veh-incidents',
            paint: {
              'circle-color': {
                property: 'CYC_INJ',
                type: 'interval',
                stops: stops,
              },
              'circle-radius': {
                property: 'CYC_INJ',
                base: 3,
                type: 'interval',
                stops: radiusStops,
              },
              'circle-opacity': 0.9,
              'circle-blur': 0.7,
            },
            filter: ['>=', 'CYC_INJ', 1],
          },
          'waterway-label'
        );

        map.addLayer(
          {
            id: 'veh-incd-base',
            type: 'circle',
            source: 'veh-incidents',
            paint: {
              'circle-color': 'yellow',
              'circle-radius': 3,
              'circle-opacity': 0.5,
              'circle-blur': 1,
            },
            filter: ['<', 'CYC_INJ', 1],
          },
          'waterway-label'
        );
      });
    });
  }
  render() {
    return (
      <div className="dashboard" className="fitParent">
        <div id="map" className="fitParent" />
      </div>
    );
  }
}

export default Trees;
