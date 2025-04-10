import React from 'react';

const EditorPanel = ({ markdown, setMarkdown }) => {
  return (
    <div className="editor-container">
      <textarea
        className="editor"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Start typing..."
      />
    </div>
  );
};

export default EditorPanel;
