import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import mapboxgl from 'mapbox-gl';

import drawPoints from './renderer.svg/drawPoints';
import drawBundleLinks from './renderer.svg/drawBundleLinks';
import drawForceLinks from './renderer.svg/drawForceLinks';

import getAirlineData, { reProjectNodes } from './data';

export class USAirline extends PureComponent {
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
      zoom: 4,
      maxZoom: 18,
      center: [-98.35, 39.35],
    });

    // Setup our svg layer that we can manipulate with d3
    const container = map.getCanvasContainer();
    const svg = select(container)
      .append('svg')
      .style('position', 'absolute')
      .style('width', '100%')
      .style('height', '100%')
      .style('pointer-events', 'none');

    let nodes = [];
    let edges = [];

    map.on('load', async () => {
      getAirlineData(map).then(data => {
        nodes = data.nodes;
        edges = data.edges;

        drawPoints(nodes, svg);
        drawLinks(nodes, edges, svg);
      });

      const onMove = () => {
        nodes = reProjectNodes(nodes, map);

        drawPoints(nodes, svg);
        svg.selectAll('.edge').attr('opacity', 0);
      };

      //re-render our visualization whenever the view changes
      map.on('viewreset', () => drawLinks(nodes, edges, svg));
      map.on('dragend', () => drawLinks(nodes, edges, svg));
      map.on('pitchend', () => drawLinks(nodes, edges, svg));
      map.on('rotateend', () => drawLinks(nodes, edges, svg));
      map.on('zoomend', () => drawLinks(nodes, edges, svg));
      map.on('move', () => onMove());
    });
  }

  render() {
    return <div id="map" className="fitParent" />;
  }
}

export default USAirline;
