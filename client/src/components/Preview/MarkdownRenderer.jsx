import React from 'react';
import { parseMarkdown } from '../../utils/markdownParser';
import './preview.css';

const MarkdownRenderer = ({ markdownText }) => {
  const renderedHTML = parseMarkdown(markdownText);

  return (
    <div className="markdown-renderer">
      <div dangerouslySetInnerHTML={{ __html: renderedHTML }} />
    </div>
  );
};

export default MarkdownRenderer;