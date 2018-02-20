/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from './components/NotFoundPage';
import WelcomePage from './pages/Welcome';
import Layout from './components/Layout';
import Loading from './components/Loading';
import EmptyLayout from './components/Layout/EmptyLayout';

import Census2010 from './containers/Census2010';
import PedcycCollisions from './containers/PedcycCollisions';

import WorldFlightCanvas from './containers/WorldFlight/CanvasOverlay';
import WorldFlightMapboxGL from './containers/WorldFlight/MapboxGLOverlay';
import WorldFlightGL from './containers/PIXIOverlay/WordFlighht';

import AirlineCanvasFEBPage from './pages/USAirlineCanvasFEB';
import AirlineCanvasForcePage from './pages/USAirlineCanvasForce';
import AirlineSVGForcePage from './pages/USAirlineSVGForce';
import USAirlineSVGFEBPage from './pages/USAirlineSVGFEB';
import AirlineGL from './containers/PIXIOverlay/Airline';
import ProjectionTest from './containers/Projection/ProjectionTest';

const MasterLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

const EmptyLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <EmptyLayout>
          <Component {...matchProps} />
        </EmptyLayout>
      )}
    />
  );
};

export default function Routes() {
  return (
    <Switch>
      <EmptyLayoutRoute exact path="/" component={WelcomePage} />
      <EmptyLayoutRoute path="/census" component={Census2010} />
      <EmptyLayoutRoute path="/pedcyc" component={PedcycCollisions} />

      <EmptyLayoutRoute path="/flight/mapbox" component={WorldFlightMapboxGL} />
      <EmptyLayoutRoute path="/flight/gl" component={WorldFlightGL} />
      <EmptyLayoutRoute path="/flight/canvas" component={WorldFlightCanvas} />
      <EmptyLayoutRoute
        path="/airline/canvas/force"
        component={AirlineCanvasForcePage}
      />
      <EmptyLayoutRoute
        path="/airline/canvas/feb"
        component={AirlineCanvasFEBPage}
      />
      <EmptyLayoutRoute
        path="/airline/svg/force"
        component={AirlineSVGForcePage}
      />
      <EmptyLayoutRoute
        path="/airline/svg/feb"
        component={USAirlineSVGFEBPage}
      />
      <EmptyLayoutRoute path="/airline/gl" component={AirlineGL} />

      <EmptyLayoutRoute path="/projection/test" component={ProjectionTest} />

      <EmptyLayoutRoute path="/loading" component={Loading} />

      <MasterLayout path="" component={NotFoundPage} />
    </Switch>
  );
}
