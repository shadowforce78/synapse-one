import React, { useState } from 'react';

const CodeEditor = () => {
  const [markdown, setMarkdown] = useState('');

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <textarea
      value={markdown}
      onChange={handleChange}
      placeholder="Write your markdown here..."
      rows="20"
      style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
    />
  );
};

export default CodeEditor;