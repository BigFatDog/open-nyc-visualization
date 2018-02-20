import React, { PureComponent } from 'react';
import { json } from 'd3-fetch';
import * as PIXI from 'pixi.js';
import L from 'mapbox.js';
import { interpolateViridis } from 'd3-scale-chromatic';
import { color } from 'd3-color';

import { scaleSequential } from 'd3-scale';

import solveCollision from './lib/solveCollision';
import './lib/PixiOverlay';
import getAirlineData from '../UsAirline/data';

import ImgPlane from './img/plane.png';
import ImgFocusPlane from './img/focus-plane.png';
import ImgCircle from './img/circle.png';
import imgFocusCircle from './img/focus-circle.png';
import ImgBicycle from './img/bicycle.png';
import ImgFocusBicycle from './img/focus-bicycle.png';

const loader = new PIXI.loaders.Loader();
loader
  .add('plane', ImgPlane)
  .add('focusPlane', ImgFocusPlane)
  .add('circle', ImgCircle)
  .add('focusCircle', imgFocusCircle)
  .add('bicycle', ImgBicycle)
  .add('focusBicycle', ImgFocusBicycle);

export class AirlinePixi extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const map = L.map('map', { zoomControl: false }).setView(
      [37.49229399862877, -96.94335937500001],
      4
    );
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/mapbox/traffic-night-v2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlnZmF0ZG9nIiwiYSI6ImM1ZWIyYzYzMzkyM2JlMTc0M2VjNmRlOTk5NDdkN2VjIn0.DoyA-reichUjF_FO9dkazQ',
      {
        minZoom: 2,
        maxZoom: 18,
        detectRetina: true,
      }
    ).addTo(map);

    map.attributionControl.setPosition('bottomleft');

    loader.load(async (loader, resources) => {
      const textures = [resources.plane.texture];
      const focusTextures = [resources.focusPlane.texture];

      getAirlineData(map).then(data => {
        const { nodes, edges } = data;

        const pixiLayer = (() => {
          let firstDraw = true;
          let prevZoom;
          let nodeSprites = [];
          const colorScale = scaleSequential(interpolateViridis).domain([
            0,
            50,
            100,
          ]);

          let frame = null;
          let focus = null;
          const pixiContainer = new PIXI.Container();
          return L.pixiOverlay(
            function(utils) {
              const zoom = utils.getMap().getZoom();
              if (frame) {
                cancelAnimationFrame(frame);
                frame = null;
              }
              let container = utils.getContainer();
              let renderer = utils.getRenderer();
              let project = utils.latLngToLayerPoint;
              let scale = utils.getScale();
              let invScale = 1 / scale;
              if (firstDraw) {
                prevZoom = zoom;
                nodes.forEach(function(marker) {
                  let coords = project([marker.latitude, marker.longitude]);
                  let index = Math.floor(Math.random() * textures.length);
                  let markerSprite = new PIXI.Sprite(textures[index]);
                  markerSprite.textureIndex = index;
                  markerSprite.x0 = coords.x;
                  markerSprite.y0 = coords.y;
                  markerSprite.anchor.set(0.5, 0.5);
                  let tint = color(
                    colorScale(marker.avancement || Math.random() * 100)
                  ).rgb();
                  markerSprite.tint = 256 * (tint.r * 256 + tint.g) + tint.b;
                  container.addChild(markerSprite);
                  nodeSprites.push(markerSprite);
                  markerSprite.legend =
                    marker.id || marker.city || marker.label;

                  marker.x = coords.x;
                  marker.y = coords.y;
                });

                //                            d3line.context(renderer.context);
                //
                //                            console.log(renderer.context)

                let linkGraphics = new PIXI.Graphics();
                linkGraphics.lineStyle(8, 0x3388ff, 0.3);
                linkGraphics.beginFill(0x3388ff, 0.1);

                for (let e of edges) {
                  let source = nodes[e.source];
                  let target = nodes[e.target];

                  let sourceCoords = project([
                    source.latitude,
                    source.longitude,
                  ]);
                  let targetCoords = project([
                    target.latitude,
                    target.longitude,
                  ]);

                  linkGraphics.moveTo(sourceCoords.x, sourceCoords.y);
                  linkGraphics.lineTo(targetCoords.x, targetCoords.y);
                }

                linkGraphics.endFill();
                container.addChild(linkGraphics);

                let quadTrees = {};
                for (let z = map.getMinZoom(); z <= map.getMaxZoom(); z++) {
                  let rInit = (z <= 7 ? 16 : 24) / utils.getScale(z);
                  quadTrees[z] = solveCollision(nodeSprites, {
                    r0: rInit,
                    zoom: z,
                  });
                }

                function findMarker(ll) {
                  let layerPoint = project(ll);
                  let quadTree = quadTrees[utils.getMap().getZoom()];
                  let marker;
                  let rMax = quadTree.rMax;
                  let found = false;
                  quadTree.visit(function(quad, x1, y1, x2, y2) {
                    if (!quad.length) {
                      let dx = quad.data.x - layerPoint.x;
                      let dy = quad.data.y - layerPoint.y;
                      let r = quad.data.scale.x * 16;
                      if (dx * dx + dy * dy <= r * r) {
                        marker = quad.data;
                        found = true;
                      }
                    }
                    return (
                      found ||
                      x1 > layerPoint.x + rMax ||
                      x2 + rMax < layerPoint.x ||
                      y1 > layerPoint.y + rMax ||
                      y2 + rMax < layerPoint.y
                    );
                  });
                  return marker;
                }

                map.on('click', function(e) {
                  let redraw = false;
                  if (focus) {
                    focus.texture = textures[focus.textureIndex];
                    focus = null;
                    L.DomUtil.addClass(legend, 'hide');
                    legendContent.innerHTML = '';
                    redraw = true;
                  }
                  let marker = findMarker(e.latlng);
                  if (marker) {
                    marker.texture = focusTextures[marker.textureIndex];
                    focus = marker;
                    legendContent.innerHTML = marker.legend;
                    L.DomUtil.removeClass(legend, 'hide');
                    redraw = true;
                  }
                  if (redraw) utils.getRenderer().render(container);
                });
                let self = this;
                map.on(
                  'mousemove',
                  L.Util.throttle(function(e) {
                    let marker = findMarker(e.latlng);
                    if (marker) {
                      L.DomUtil.addClass(
                        self._container,
                        'leaflet-interactive'
                      );
                    } else {
                      L.DomUtil.removeClass(
                        self._container,
                        'leaflet-interactive'
                      );
                    }
                  }, 32)
                );
              }
              if (firstDraw || prevZoom !== zoom) {
                nodeSprites.forEach(function(markerSprite) {
                  let position = markerSprite.cache[zoom];
                  if (firstDraw) {
                    markerSprite.x = position.x;
                    markerSprite.y = position.y;
                    markerSprite.scale.set(
                      position.r * scale < 16 ? position.r / 16 : invScale
                    );
                  } else {
                    markerSprite.currentX = markerSprite.x;
                    markerSprite.currentY = markerSprite.y;
                    markerSprite.targetX = position.x;
                    markerSprite.targetY = position.y;
                    markerSprite.currentScale = markerSprite.scale.x;
                    markerSprite.targetScale =
                      position.r * scale < 16 ? position.r / 16 : invScale;
                  }
                });
              }

              let start = null;
              let delta = 250;

              function animate(timestamp) {
                let progress;
                if (start === null) start = timestamp;
                progress = timestamp - start;
                let lambda = progress / delta;
                if (lambda > 1) lambda = 1;
                lambda = lambda * (0.4 + lambda * (2.2 + lambda * -1.6));
                nodeSprites.forEach(function(markerSprite) {
                  markerSprite.x =
                    markerSprite.currentX +
                    lambda * (markerSprite.targetX - markerSprite.currentX);
                  markerSprite.y =
                    markerSprite.currentY +
                    lambda * (markerSprite.targetY - markerSprite.currentY);
                  markerSprite.scale.set(
                    markerSprite.currentScale +
                      lambda *
                        (markerSprite.targetScale - markerSprite.currentScale)
                  );
                });
                renderer.render(container);
                if (progress < delta) {
                  frame = requestAnimationFrame(animate);
                }
              }

              if (!firstDraw && prevZoom !== zoom) {
                frame = requestAnimationFrame(animate);
              }
              firstDraw = false;
              prevZoom = zoom;
              renderer.render(container);
            },
            pixiContainer,
            {
              padding: 0.2,
              doubleBuffering:
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !window.MSStream,
            }
          );
        })();

        pixiLayer.addTo(map);
      });
    });
  }

  render() {
    return <div id="map" className="fitParent" />;
  }
}

export default AirlinePixi;
