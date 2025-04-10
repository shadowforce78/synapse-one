import React from 'react';

const EditorPanel = React.forwardRef(({ markdown, setMarkdown }, ref) => {
  return (
    <div className="editor-container" ref={ref}>
      <textarea
        className="editor"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Start typing..."
      />
    </div>
  );
});

export default EditorPanel;
