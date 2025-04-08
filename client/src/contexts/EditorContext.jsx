import React, { createContext, useState } from 'react';

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [markdown, setMarkdown] = useState('');

  return (
    <EditorContext.Provider value={{ markdown, setMarkdown }}>
      {children}
    </EditorContext.Provider>
  );
};