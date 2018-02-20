import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Styles = ['basic', 'streets', 'bright', 'light', 'dark', 'satellite'];

class MapStyleControl extends PureComponent {
  static propTypes = {
    changeStyle: PropTypes.func.isRequired,
  };
  renderControl(id) {
    const { changeStyle } = this.props;
    return (
      <button
        key={id}
        className="btn btn-light"
        onClick={evt => changeStyle(`mapbox://styles/mapbox/${id}-v9`)}
      >
        {_.capitalize(id)}
      </button>
    );
  }

  render() {
    return (
      <div
        id="menu"
        style={{ position: 'absolute', top: '0px', background: '#ffffff' }}
      >
        {Styles.map(::this.renderControl)}
      </div>
    );
  }
}

export default MapStyleControl;
