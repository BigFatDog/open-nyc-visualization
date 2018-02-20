import React, { PureComponent } from 'react';

import { select } from 'd3-selection';
import mapboxgl from 'mapbox-gl';

import getProjector from './D3Projection';
import mapboxProjection from './MapboxProjection';
import ViewportMercatorProjection from './ViewportMercatorProjection';

const point = [-74.0059, 40.7128];

export class ProjectionTest extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 12,
      maxZoom: 18,
      center: point,
    });

    const container = map.getCanvasContainer();
    const svg = select(container)
      .append('svg')
      .style('position', 'absolute')
      .classed('fitParent', true);

    const d3Projection = getProjector(map);
    const viewPortProjection = ViewportMercatorProjection(map);

    const mapboxCircle = svg
      .append('circle')
      .attr('stroke', '#111')
      .attr('fill-opacity', 0.1)
      .attr('r', 15);
    const vpCircle = svg
      .append('circle')
      .attr('stroke', 'blue')
      .attr('fill-opacity', 0.1)
      .attr('r', 20);
    const d3Circle = svg
      .append('circle')
      .attr('stroke', 'orange')
      .attr('stroke-width', 4)
      .attr('fill-opacity', 0.1)
      .attr('r', 25);

    const render = () => {
      // we update our calculated projections whenever the underlying map changes
      // due to zoom and pan
      const mapboxPos = mapboxProjection(map, point);
      mapboxCircle.attr('cx', mapboxPos[0]);
      mapboxCircle.attr('cy', mapboxPos[1]);

      const vpPos = viewPortProjection.project(point);
      vpCircle.attr('cx', vpPos[0]);
      vpCircle.attr('cy', vpPos[1]);

      const d3Pos = d3Projection(point);
      d3Circle.attr('cx', d3Pos[0]);
      d3Circle.attr('cy', d3Pos[1]);
    };

    map.on('load', () => {
      render();
    });

    // re-render our visualization whenever the view changes
    map.on('viewreset', () => render());
    map.on('dragend', () => render());
    map.on('pitchend', () => render());
    map.on('rotateend', () => render());
    map.on('zoomend', () => render());

    map.on('move', () => render());
  }

  render() {
    return <div id="map" className="fitParent" />;
  }
}

export default ProjectionTest;
