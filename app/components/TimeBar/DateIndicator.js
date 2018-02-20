import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

class DateIndicator extends PureComponent {
  static propTypes = {
    hidden: PropTypes.bool,
    date: PropTypes.string,
  };

  static defaultProps = {
    hidden: false,
  };

  render() {
    const { hidden, date } = this.props;

    const clazz =
      hidden === true
        ? 'zdView-DateIndicator collapse'
        : 'zdView-DateIndicator';

    const formattedDate = moment(date, '%Y-%m-%d %H:%M:%S').format(
      'YYYY年MM月DD日 HH:mm:ss'
    );

    return (
      <div className={clazz} style={{ display: 'block' }}>
        <div className="zd icon calendar fas fa-calendar-alt" />
        <div className="zd icon filter fas fa-filter" />
        <div
          className="date-time-wrap"
          data-live="false"
          data-include-time="true"
        >
          {formattedDate}
        </div>
      </div>
    );
  }
}

export default DateIndicator;
