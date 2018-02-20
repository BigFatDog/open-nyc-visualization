import React from 'react';

export default ({ children }) => {
  return (
    <div id="container" className="fitParent">
      <div
        className="content-wrapper"
        style={{
          position: 'relative',
          top: '50px',
          height: 'calc(100% - 50px)',
        }}
      >
        {children}
      </div>
    </div>
  );
};
