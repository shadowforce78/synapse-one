import React from 'react';
import './SplitView.css';

const SplitView = ({ children }) => {
  return (
    <div className="split-view">
      {children}
    </div>
  );
};

export default SplitView;