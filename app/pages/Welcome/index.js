import React from 'react';
import {Link} from 'react-router-dom';
import './card.css';
import FlightMapboxImg from './img/flights-mapbox.jpg';
import FlightGLImg from './img/flights-gl.png';
import FlightCanvasImg from './img/fligths-canvas.png';
import USAirlineSVGImg from './img/us-airline-svg.png';
import USAirlineCanvasImg from './img/us-airline-canvas.png';
import USAirlineGLImg from './img/us-airline-gl.png';

import CensusImg from './img/census-2010.png';
import PedcycImg from './img/pedcyc.png';

export default () => {
  return (
    <div className="fitParent" style={{overflowY: 'auto'}}>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="title">NYC Open Data</div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" src={CensusImg} alt="Census 2010"/>
                <div className="card-body">
                  <p className="card-text">
                    Faithfully distribution of 300 million points on an
                    interactive map. Achieved with data shader and d3
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link className="btn btn-sm btn-secondary" to="/census">
                        Visit
                      </Link>
                    </div>
                    <small className="text-muted">
                      <a
                        target="_blank"
                        href="https://www.census.gov/2010census/"
                      >
                        data source
                      </a>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={PedcycImg}
                  alt="NYPD Motor Vehicle Collisions"
                />
                <div className="card-body">
                  <p className="card-text">
                    NYPD Motor Vehicle Collisions. Purely done with MapboxGL's
                    data driven styling. Data has been already aggregated
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link className="btn btn-sm btn-secondary" to="/pedcyc">
                        Visit
                      </Link>
                    </div>
                    <small className="text-muted">
                      <a
                        target="_blank"
                        href="https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95"
                      >
                        data source
                      </a>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="title">World Flights</div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={FlightGLImg}
                  alt="World Flight GL"
                />
                <div className="card-body">
                  <p className="card-text">
                    Routes colors stands for departure countries. Technology: D3,
                    PIXI and mapbox.js.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link className="btn btn-sm btn-secondary" to="/flight/gl">
                        Visit
                      </Link>
                    </div>
                    <small className="text-muted">8107 nodes, 65563 edges</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={FlightCanvasImg}
                  alt="World Flight Canvas"
                />
                <div className="card-body">
                  <p className="card-text">
                    Achieved by overlaying canvas on mapbox.js. No icons (no
                    conflict resolve) are used.
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link className="btn btn-sm btn-secondary" to="/flight/canvas">
                        Visit
                      </Link>
                    </div>
                    <small className="text-muted">8107 nodes, 65563 edges</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={FlightMapboxImg}
                  alt="World Flight Mapbox"
                />
                <div className="card-body">
                  <p className="card-text">
                    Rendered purely with MapboxGL's data driven styling. You may
                    choose a departure country to filter routes
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link className="btn btn-sm btn-secondary" to="/flight/mapbox">
                        Visit
                      </Link>
                    </div>
                    <small className="text-muted">8107 nodes, 65563 edges</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="title">U.S. Airlines</div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={USAirlineGLImg}
                  alt="US Airline GL"
                />
                <div className="card-body">
                  <p className="card-text">
                    Layouts are computed in WebWorkers. Technology: D3, PIXI,
                    Mapbox.js and WebWorker.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link className="btn btn-sm btn-secondary" to="/airline/gl">
                        Visit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={USAirlineCanvasImg}
                  alt="US Airline Canvas"
                />
                <div className="card-body">
                  <p className="card-text">
                    Canvas overlay on Mapbox.js. Has Force Layout and Force Edge
                    Bundling Layout and Force Layout.
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link className="btn btn-sm btn-secondary" to="/airline/canvas/force">
                        Force
                      </Link>
                      <Link className="btn btn-sm btn-secondary btn-second" to="/airline/canvas/feb">
                        Edge Bundling
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 box-shadow">
                <img
                  className="card-img-top"
                  src={USAirlineSVGImg}
                  alt="US Airline SVG"
                />
                <div className="card-body">
                  <p className="card-text">
                    SVG overlay on mapbox.js. Best color and worst performance.
                    Technology: D3, Mapbox.js, WebWorker.
                  </p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <Link className="btn btn-sm btn-secondary" to="/airline/svg/force">
                        Force
                      </Link>
                      <Link className="btn btn-sm btn-secondary btn-second" to="/airline/svg/feb">
                        Edge Bundling
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
