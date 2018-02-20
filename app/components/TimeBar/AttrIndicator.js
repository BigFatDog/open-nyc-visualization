import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AttrIndicator extends PureComponent {
  static propTypes = {
    hidden: PropTypes.bool,
  };

  static defaultProps = {
    hidden: false,
  };

  render() {
    const { hidden } = this.props;

    const clazz =
      hidden === true
        ? 'zdView-AttrIndicator collapse'
        : 'zdView-AttrIndicator';

    return (
      <div
        className={clazz}
        style={{ display: 'block', borderRight: '1px #B2B2B2 solid' }}
      >
        <div className="attr-indicator">
          <div className="text withTimeZone">datetime</div>
          <div className="timezone">UTC</div>
        </div>
      </div>
    );
  }
}

export default AttrIndicator;
