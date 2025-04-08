import React from 'react';
import EditorPanel from '../Editor';
import PreviewPanel from '../Preview';
import './SplitView.css';

const SplitView = () => {
  return (
    <div className="split-view">
      <div className="editor-section">
        <EditorPanel />
      </div>
      <div className="preview-section">
        <PreviewPanel />
      </div>
    </div>
  );
};

export default SplitView;