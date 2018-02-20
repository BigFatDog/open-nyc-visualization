import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

class Dragger extends PureComponent {
  static propTypes = {
    initialX: PropTypes.number,
    handleStop: PropTypes.func,
    handleDrag: PropTypes.func,
    orientation: PropTypes.string,
  };

  render() {
    const { initialX, handleStop, handleDrag, orientation } = this.props;
    const wrapperClass = `zdView-DragElement ${orientation} ui-draggable`;

    return (
      <Draggable
        axis="x"
        handle=".ui-draggable"
        defaultPosition={{ x: initialX, y: 0 }}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div className={wrapperClass}>
          <div className="vertical" />
          <div className="round-corner">
            <div className="zd icon drag-vertical">
              <i className="fas fa-th" />
            </div>
            <div className="zd icon pinned" />
          </div>
        </div>
      </Draggable>
    );
  }
}

export default Dragger;
