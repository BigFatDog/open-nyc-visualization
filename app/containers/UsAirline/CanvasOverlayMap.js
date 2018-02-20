import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import mapboxgl from 'mapbox-gl';

import drawPoints from './renderer.canvas/drawPoints';
import drawForceLinks from './renderer.canvas/drawForceLinks';
import drawBundleLinks from './renderer.canvas/drawBundleLinks';
import getAirlineData, { reProjectNodes } from './data';

export class USAirlineCanvas extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    mode: PropTypes.oneOf(['force', 'bundle']),
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  setLoading(loading) {
    this.setState({ loading: loading });
  }

  componentDidMount() {
    const { mode } = this.props;

    const drawLinks = mode === 'force' ? drawForceLinks : drawBundleLinks;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      zoom: 3,
      maxZoom: 18,
      center: [-98.35, 39.35],
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

    let nodes = [];
    let edges = [];

    map.on('load', async () => {
      getAirlineData(map).then(data => {
        nodes = data.nodes;
        edges = data.edges;

        context.clearRect(0, 0, width, height);
        drawPoints(nodes, context);
        drawLinks(nodes, edges, context, map);
      });

      const onMove = () => {
        nodes = reProjectNodes(nodes, map);

        context.clearRect(0, 0, width, height);
        drawPoints(nodes, context);
        canvas.selectAll('.edge').attr('opacity', 0);
      };

      //re-render our visualization whenever the view changes
      map.on('viewreset', () => drawLinks(nodes, edges, context));
      map.on('dragend', () => drawLinks(nodes, edges, context));
      map.on('pitchend', () => drawLinks(nodes, edges, context));
      map.on('rotateend', () => drawLinks(nodes, edges, context));
      map.on('zoomend', () => drawLinks(nodes, edges, context));
      map.on('move', () => onMove());
    });
  }

  render() {
    return <div id="map" className="fitParent" />;
  }
}

export default USAirlineCanvas;
