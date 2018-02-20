import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { scaleLinear } from 'd3';

import TimeScrubber from './TimeScrubber';
import DraggerTooltip from './DraggerTooltip';
import Dragger from './Dragger';

class TimeContainer extends PureComponent {
  static propTypes = {
    handleTimeFilterd: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.handleLeftStop = this.handleLeftStop.bind(this);
    this.handleRightStop = this.handleRightStop.bind(this);
    this.handleLeftMoving = this.handleLeftMoving.bind(this);
    this.handleRightMoving = this.handleRightMoving.bind(this);

    // fake 959 * 32
    this.state = {
      dragLeft: 54,
      dragRight: 959,
      leftMoving: 54,
      rightMoving: 959,
    };
  }

  handleLeftStop(event, data) {
    this.setState({ dragLeft: event.layerX });
    const { handleTimeFilterd } = this.props;

    handleTimeFilterd(this._filterTime());
  }

  handleRightStop(event, data) {
    this.setState({ dragRight: event.layerX });
    const { handleTimeFilterd } = this.props;

    handleTimeFilterd(this._filterTime());
  }

  handleLeftMoving(evt, data) {
    this.setState({ leftMoving: evt.layerX });
  }

  handleRightMoving(evt, data) {
    this.setState({ rightMoving: evt.layerX });
  }

  _filterTime() {
    const { start, end } = this.props;
    const { dragLeft, dragRight } = this.state;
    const toDate = d => moment(d, 'YYYY-MM-DD HH:mm:ss').toDate();
    const timeScale = scaleLinear()
      .domain([54, 959])
      .range([toDate(start), toDate(end)]);
    const getDate = d =>
      moment(timeScale(d))
        .format('YYYY-MM-DD HH:mm:ss')
        .toString();

    const low = getDate(dragLeft);
    const high = getDate(dragRight);

    return {
      start: low,
      end: high,
    };
  }

  render() {
    const { start, end } = this.props;
    const { dragLeft, dragRight, leftMoving, rightMoving } = this.state;

    const toDate = d => moment(d, 'YYYY-MM-DD HH:mm:ss').toDate();
    const timeScale = scaleLinear()
      .domain([54, 959])
      .range([toDate(start), toDate(end)]);
    const getDate = d =>
      moment(timeScale(d))
        .format('YYYY-MM-DD HH:mm:ss')
        .toString();

    const low = getDate(leftMoving);
    const high = getDate(rightMoving);

    return (
      <div
        id="time-container"
        className="zdView-TimeScrubber expandable-left"
        ref={ref => (this.timeContainer = ref)}
        style={{
          display: 'block',
          width: 'calc(100% - 410px)',
          height: '32px',
          backgroundColor: 'black',
        }}
      >
        <TimeScrubber
          container={this.timeContainer}
          width={959}
          height={32}
          start={start}
          end={end}
          dragLeft={dragLeft}
          dragRight={dragRight}
        />

        <div className="expand-left" />
        <Dragger
          initialX={dragLeft}
          orientation="left"
          handleStop={this.handleLeftStop}
          handleDrag={this.handleLeftMoving}
        />
        <Dragger
          initialX={dragRight}
          orientation="right"
          handleStop={this.handleRightStop}
          handleDrag={this.handleRightMoving}
        />
        <DraggerTooltip left={leftMoving} timestamp={low} />
        <DraggerTooltip left={rightMoving} timestamp={high} />
        <div className="expand-right" />
      </div>
    );
  }
}

export default TimeContainer;
