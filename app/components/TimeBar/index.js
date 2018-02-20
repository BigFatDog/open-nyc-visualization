import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import PlayControl from './PlayControl';
import SpeedControl from './SpeedControl';
import AttrIndicator from './AttrIndicator';
import DateIndicator from './DateIndicator';
import TimeContainer from './TimeContainer';

class TimeBar extends Component {
  static propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    handleTimeFilterd: PropTypes.func,
  };

  render() {
    const { start, end, handleTimeFilterd } = this.props;

    return (
      <div className="bottomPane">
        <div className="paneContent">
          <div
            className="visualization-control zdView-TimeBarController"
            style={{ display: 'flex' }}
          >
            <AttrIndicator />
            <PlayControl />
            <SpeedControl />
            <DateIndicator date={start} />
            <TimeContainer
              start={start}
              end={end}
              handleTimeFilterd={handleTimeFilterd}
            />
            <DateIndicator date={end} />
          </div>
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = createStructuredSelector({});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TimeBar);
