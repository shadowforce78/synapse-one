import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import PreviewHeader from './PreviewHeader';

const PreviewPanel = ({ markdownText }) => {
  return (
    <div className="preview-panel">
      <PreviewHeader />
      <MarkdownRenderer markdownText={markdownText} />
    </div>
  );
};

export default PreviewPanel;