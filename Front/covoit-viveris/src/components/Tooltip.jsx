import React, { useState } from 'react';

export function Tooltip({ content, children }) {

  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {showTooltip && (
        <div
          style={{
            position : 'absolute',
            width    : '500%',
            top      : '100%',
            left     : '50%',
            padding  : '10px',
            transform: 'translateX(-50%)',
            backgroundColor: '#f1f1f1',
            borderRadius   : '5px',
            boxShadow      : '0 2px 10px rgba(0, 0, 0, 0.2)',
            zIndex         : 1
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  );
};