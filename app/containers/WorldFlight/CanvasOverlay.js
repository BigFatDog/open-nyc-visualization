import React, { PureComponent } from 'react';

import { select } from 'd3-selection';
import mapboxgl from 'mapbox-gl';

import drawPoints from './renderer.canvas/drawPoints';
import drawLinks from './renderer.canvas/drawLinks';

import getWorldFlightData, { reProjectNodes } from './data';

export class WorldFlight extends PureComponent {
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

    const container = map.getCanvasContainer();
    const bbox = document.body.getBoundingClientRect();
    const width = bbox.width;
    const height = bbox.height;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const canvas = select(container)
      .append('canvas')
      .attr('id', 'force-overlay')
      .style('position', 'absolute')
      .style('width', width + 'px')
      .style('height', height + 'px')
      .attr('width', width * devicePixelRatio)
      .attr('height', height * devicePixelRatio);

    const context = canvas.node().getContext('2d');
    context.scale(devicePixelRatio, devicePixelRatio);

    let nodes,
      edges = [];

    map.on('load', async () => {
      const data = await getWorldFlightData(map);

      nodes = data.nodes;
      edges = data.edges;

      context.clearRect(0, 0, width, height);

      drawPoints(nodes, context);
      drawLinks(nodes, edges, context);
    });

    const onMove = () => {
      nodes = reProjectNodes(nodes, map);

      context.clearRect(0, 0, width, height);

      drawPoints(nodes, context);
      canvas.selectAll('.edge').attr('opacity', 0);
    };

    // re-render our visualization whenever the view changes
    map.on('viewreset', () => drawLinks(nodes, edges, context));
    map.on('dragend', () => drawLinks(nodes, edges, context));
    map.on('pitchend', () => drawLinks(nodes, edges, context));
    map.on('rotateend', () => drawLinks(nodes, edges, context));
    map.on('zoomend', () => drawLinks(nodes, edges, context));

    map.on('move', () => onMove());
  }

  render() {
    return <div id="map" className="fitParent" />;
  }
}

export default WorldFlight;
