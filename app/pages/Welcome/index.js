import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import FlightMapboxImg from './img/flights-mapbox.jpg';
import FlightGLImg from './img/flights-gl.png';
import FlightCanvasImg from './img/fligths-canvas.png';
import USAirlineSVGImg from './img/us-airline-svg.png';
import USAirlineCanvasImg from './img/us-airline-canvas.png';
import USAirlineGLImg from './img/us-airline-gl.png';
import CensusImg from './img/census-2010.png';

import PedcycImg from './img/pedcyc.png';

const LinkButton = (url, title = 'Visit') => (
  <Link className="card-btn" to={url}>
    {title}
  </Link>
);

const Card = (title, data, gradient, img, description, link, codeLink) => (
  <div className="col-md-4 col-xs-12 col-sm-12 col-lg-3 margin-5">
    <div className="card mb-4 box-shadow">
      <div className="inner-layer">
        <div className="card-img-caption">{title}</div>
        <div className="card-img-caption-secondary">{data}</div>
      </div>
      <img className="card-top-img" src={img} alt="Card image cap" />
      <div className={gradient}>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
          {link}
          <a className="card-btn" target="_blank" href={codeLink}>
            Code
          </a>
        </div>
      </div>
    </div>
  </div>
);

const FlightsMapboxGLCard = Card(
  'World Flights',
  '8107 nodes, 65563 edges',
  'card-body gradient-rainy-ashville',
  FlightMapboxImg,
  'MapboxGL data driven styling',
  LinkButton('/flight/mapbox'),
  ''
);

const FlightsPIXICard = Card(
  'World Flights',
  '8107 nodes, 65563 edges',
  'card-body gradient-sunny-morning',
  FlightGLImg,
  'WebGL overlay on mapbox.js.',
  LinkButton('/flight/gl'),
  ''
);

const FlightsCanvasCard = Card(
  'World Flights',
  '8107 nodes, 65563 edges',
  'card-body gradient-frozen-dreams',
  FlightCanvasImg,
  'Canvas overlay on mapbox.js.',
  LinkButton('/flight/canvas'),
  ''
);
const AirlineLinks = (
  <div>
    {LinkButton('/airline/svg/force', 'Force')}
    {LinkButton('/airline/svg/feb', 'Bundling')}
  </div>
);

const USAirlineSVGCard = Card(
  'U.S. Airline',
  'Both run Force Layout and Force Edge Bundling in webworkers',
  'card-body gradent-winter-nerva',
  USAirlineSVGImg,
  'D3, WebWorker, MapboxGL, SVG',
  AirlineLinks,
  ''
);

const AirlineCanvasLinks = (
  <div>
    {LinkButton('/airline/canvas/force', 'Force')}
    {LinkButton('/airline/canvas/feb', 'Bundling')}
  </div>
);

const USAirlineCanvasCard = Card(
  'U.S. Airline',
  'Both run Force Layout and Force Edge Bundling in webworkers',
  'card-body gradient-dusty-grass',
  USAirlineCanvasImg,
  'D3, WebWorker, MapboxGL, Canvas',
  AirlineCanvasLinks,
  ''
);

const USAirlineGLCard = Card(
  'U.S. Airline',
  'Both run Force Layout and Force Edge Bundling in webworkers',
  'card-body gradient-azure',
  USAirlineGLImg,
  'D3, PIXI, WebWorker',
  LinkButton('/airline/gl'),
  ''
);

const CensusCard = Card(
  'Census 2010',
  '',
  'card-body gradient-new-life',
  CensusImg,
  '300 million points',
  LinkButton('/census'),
  ''
);

const PedcycCollisionCard = Card(
  'NYPD Motor Vehicle Collisions',
  'Public Safety',
  'card-body gradient-night-fade',
  PedcycImg,
  'MapboxGL data driven styling',
  LinkButton('/pedcyc'),
  ''
);

export default () => {
  return (
    <div className="fitParent" style={{ overflowY: 'auto' }}>
      <div
        className="container-fluid"
        style={{
          paddingTop: '0px',
          paddingLeft: '40px',
          paddingRight: '40px',
        }}
      >
        <div className="row intro-row">
          <div className="intro-title">NYC Open Data</div>
        </div>
        <div className="row">
          {CensusCard}
          {PedcycCollisionCard}
        </div>
        <div className="row intro-row">
          <div className="intro-title">Airline</div>
        </div>
        <div className="row">
          {FlightsPIXICard}
          {FlightsCanvasCard}
          {FlightsMapboxGLCard}
          {USAirlineSVGCard}
          {USAirlineCanvasCard}
          {USAirlineGLCard}
        </div>
      </div>
    </div>
  );
};
