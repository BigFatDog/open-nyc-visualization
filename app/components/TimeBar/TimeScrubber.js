import {
  interpolateArray,
  timer,
  easeCubic,
  scaleLinear,
  range,
  scaleBand,
  select,
} from 'd3';
import uuid from 'uuid/v1';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import getRects from './get-rects';

const drawCanvas = (context, rects) => {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  const total = rects.length;
  const blockSize = Math.ceil(total / 4);

  for (const rect of rects) {
    context.save();

    context.beginPath();
    context.fillStyle = rect.c;
    context.globalAlpha = 1;
    context.rect(rect.x, rect.y, rect.w, rect.h);
    context.fill();

    context.restore();
  }

  for (let i = 0; i < total; i += blockSize) {
    context.save();

    context.beginPath();
    context.moveTo(rects[i].x, 0);
    context.globalAlpha = 1;
    context.lineWidth = 0.6;
    context.strokeStyle = '#B2B2B2';
    context.lineTo(rects[i].x, 32);
    context.stroke();

    context.restore();

    // label

    context.save();
    const band = rects[blockSize - 1].x;
    const x = rects[i].x + band / 2;

    context.translate(x, 0);
    context.textAlign = 'center';
    context.fillStyle = '#B2B2B2';
    context.fillText(`${1990 + i / blockSize * 5}s`, 0, 14);

    context.restore();
  }
};

const animateStates = (initialState, finalState, duration, context) =>
  new Promise((resolve, reject) => {
    const interpolateParticles = interpolateArray(initialState, finalState);

    const batchRendering = timer(elapsed => {
      const t = Math.min(1, easeCubic(elapsed / duration));

      drawCanvas(context, interpolateParticles(t));

      if (t === 1) {
        batchRendering.stop();
        resolve(finalState);
      }
    });
  });

class TimeScrubber extends Component {
  static propTypes = {
    container: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    dragLeft: PropTypes.number,
    dragRight: PropTypes.number,
    start: PropTypes.string,
    end: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.frontCanvas = null;
    this.frontContext = null;
    this.frontId = `canvas-${uuid()}`;
  }

  componentDidMount() {
    const devicePixelRatio = window.devicePixelRatio || 1;

    this.frontCanvas = select(`#${this.frontId}`);
    this.frontContext = this.frontCanvas.node().getContext('2d');

    const backingStoreRatio =
      this.frontContext.webkitBackingStorePixelRatio ||
      this.frontContext.mozBackingStorePixelRatio ||
      this.frontContext.msBackingStorePixelRatio ||
      this.frontContext.oBackingStorePixelRatio ||
      this.frontContext.backingStorePixelRatio ||
      1;

    const ratio = devicePixelRatio / backingStoreRatio;
    this.frontContext.scale(ratio, ratio);

    this.scaleTime();
  }

  componentDidUpdate() {
    this.scaleTime();
  }

  scaleTime() {
    const { width, height, dragLeft, dragRight } = this.props;

    const totalRects = Math.round(width / 12);
    const raw = Array.from({ length: totalRects }, (v, k) => k + 1);
    const scale = scaleBand()
      .domain(raw)
      .range([0, width])
      .paddingInner(0.05)
      .paddingOuter(0.2);
    const band = scale.bandwidth();

    const within = d => scale(d) > dragLeft && scale(d) < dragRight;

    const rects = raw.map(d => ({
      x: scale(d),
      y: 20,
      w: band,
      h: 12,
      c: within(d) ? '#D7DB00' : '#B2B2B2',
    }));

    animateStates(rects, rects, 500, this.frontContext);
  }

  render() {
    const { width, height, start, end } = this.props;
    const devicePixelRatio = window.devicePixelRatio || 1;

    return (
      <canvas
        id={this.frontId}
        className="zdView-Background"
        width={width * devicePixelRatio}
        height={height * devicePixelRatio}
        style={{
          margin: '0 0 0 0',
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
    );
  }
}

export default TimeScrubber;
