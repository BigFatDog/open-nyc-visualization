import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class PlayControl extends PureComponent {
  static propTypes = {
    running: PropTypes.bool,
    hidden: PropTypes.bool,
  };

  static defaultProps = {
    running: true,
    hidden: true,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { running, hidden } = this.props;

    const icon =
      running === true
        ? 'zd icon zd-play fas fa-play'
        : 'zd icon zd-play fas fa-stop';

    const clazz =
      hidden === true ? 'zdView-PlayControl collapse' : 'zdView-PlayControl';

    return (
      <div className={clazz}>
        <div className={icon} />
      </div>
    );
  }
}

export default PlayControl;
