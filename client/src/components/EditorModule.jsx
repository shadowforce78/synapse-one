import { useEffect } from 'react';
import SplitView from './Layout/SplitView';
import EditorPanel from './Editor';
import PreviewPanel from './Preview';

const EditorModule = ({ documents, activeDocument, onDocumentChange }) => {
  const currentDoc = documents.find(doc => doc.id === activeDocument) || documents[0];
  
  const handleMarkdownChange = (newMarkdown) => {
    onDocumentChange(activeDocument, {
      ...currentDoc,
      content: newMarkdown
    });
  };

  // Forcer un rendu complet lors du changement de document actif
  useEffect(() => {
    // Assurer que KaTeX est rechargé lors du changement de document
    if (window.katex && currentDoc) {
      const elements = document.querySelectorAll('[data-latex]');
      elements.forEach(element => {
        element.removeAttribute('data-processed');
      });
    }
  }, [activeDocument, currentDoc]);

  return (
    <div className="editor-module">
      <SplitView>
        <EditorPanel 
          markdown={currentDoc.content} 
          setMarkdown={handleMarkdownChange} 
        />
        <PreviewPanel 
          markdown={currentDoc.content || ''} 
          key={activeDocument} // Forcer un remontage complet à chaque changement de document
        />
      </SplitView>
    </div>
  );
};

export default EditorModule;
