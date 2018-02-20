import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const unit = u => x => `${x}${u}`;
const px = unit('px');
const em = unit('em');
const percent = unit('percent');

class DraggerTooltip extends PureComponent {
  static propTypes = {
    left: PropTypes.number,
    timestamp: PropTypes.string,
  };

  render() {
    const { left, timestamp } = this.props;

    return (
      <div className="tooltipDatePicker-container" style={{ display: 'block' }}>
        <div
          className="zdView-Tooltip zdView-TooltipDatePicker no-padding"
          style={{
            display: 'block',
            top: 'auto',
            bottom: '33px',
            right: 'auto',
            width: '155px',
            marginLeft: px(left - 60),
            left: '-8.5px',
          }}
        >
          <div className="zd_controls_tooltip_content">
            <div className="tooltipDatePicker-content left highlight">
              <div className="clickable">
                <span className="title">{timestamp}</span>
                <div className="zd icon down fas fa-caret-down" />
              </div>
              <div className="date-time-wrap">
                <div className="zdView-DateTimePicker">
                  <div className="control-group operator">
                    <div className="picker-group">
                      <div className="date day btn zd btn" datatype="date">
                        <div className="icon-wrapper">
                          <div className="zd icon calendar" />
                        </div>
                        <input
                          type="text"
                          className="text"
                          placeholder="mm/dd/yyyy"
                        />
                      </div>
                      <div className="picker-container" />
                    </div>

                    <div className="picker-group">
                      <div className="date time zd btn" datatype="time">
                        <div className="icon-wrapper">
                          <div className="zd icon clock" />
                        </div>
                        <input
                          type="text"
                          className="text"
                          placeholder="hh:mm:ss AM/PM"
                        />
                      </div>
                      <div className="picker-container" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="zd_controls_tooltip_shape highlight">
            <div className="zd_controls_tooltip_tail between bottom" />
          </div>
        </div>
      </div>
    );
  }
}

export default DraggerTooltip;
