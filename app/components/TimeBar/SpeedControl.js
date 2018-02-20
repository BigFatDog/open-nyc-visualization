import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SpeedControl extends PureComponent {
  static propTypes = {
    hidden: PropTypes.bool,
  };

  static defaultProps = {
    hidden: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { hidden } = this.props;

    const clazz =
      hidden === true ? 'zdView-SpeedControl collapse' : 'zdView-SpeedControl';

    return (
      <div className={clazz}>
        <div className="speed-indicator">
          1 sec/<br />sec
        </div>
      </div>
    );
  }
}

export default SpeedControl;
