import React from 'react';
import './SplitView.css';

const SplitView = ({ children }) => {
  return (
    <div className="split-view">
      <div className="editor-section">
        {children[0]}
      </div>
      <div className="preview-section">
        {children[1]}
      </div>
    </div>
  );
};

export default SplitView;