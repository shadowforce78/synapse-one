import React from 'react';
import CodeEditor from './CodeEditor';
import EditorHeader from './EditorHeader';

const EditorPanel = () => {
  return (
    <div className="editor-panel">
      <EditorHeader />
      <CodeEditor />
    </div>
  );
};

export default EditorPanel;