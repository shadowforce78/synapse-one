import React from 'react';

const EditorPanel = ({ markdown, setMarkdown }) => {
  // Préserver les espaces de fin lorsqu'ils sont tapés
  const handleChange = (e) => {
    const value = e.target.value;
    // S'assurer que les espaces en fin de ligne sont préservés
    setMarkdown(value);
  };

  return (
    <div className="editor-container">
      <textarea
        className="editor"
        value={markdown}
        onChange={handleChange}
        placeholder="Start typing..."
        spellCheck="false"
      />
    </div>
  );
};

export default EditorPanel;
