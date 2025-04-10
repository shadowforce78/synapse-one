import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SideNav from './components/SideNav';
import TabBar from './components/TabBar';
import EditorModule from './components/EditorModule';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import './assets/styles/app.css';
import './assets/styles/editor.css';
import './assets/styles/preview.css';
import './assets/styles/themes.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const defaultContent = `# Welcome to Synapse One

Start typing your markdown here...

## Exemple de formule LaTeX

Soit l'équation quadratique : $ax^2 + bx + c = 0$

La solution est donnée par : $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$
`;

function AppContent() {
  const [activeModule, setActiveModule] = useState('editor');
  const [documents, setDocuments] = useState([
    { id: uuidv4(), name: 'Welcome', content: defaultContent, path: null }
  ]);
  const [activeDocument, setActiveDocument] = useState(documents[0].id);

  const phase1Tasks = [
    { id: 1, text: 'Interface avec éditeur Markdown + preview', done: true },
    { id: 2, text: 'Rendu live avec markdown-it', done: true },
    { id: 3, text: 'Mode clair / sombre', done: true },
    { id: 4, text: 'Sauvegarde locale (.md)', done: true },
    { id: 5, text: 'Chargement / ouverture fichier .md', done: true },
    { id: 6, text: 'Prise en charge de LaTeX', done: true },
    { id: 7, text: 'Export PDF', done: true },
    { id: 8, text: 'UI simple et propre', done: true }
  ];

  const handleDocumentChange = (docId, updatedDoc) => {
    setDocuments(prev => 
      prev.map(doc => doc.id === docId ? updatedDoc : doc)
    );
  };

  const handleNewTab = () => {
    const newDoc = { 
      id: uuidv4(), 
      name: '', 
      content: '# New Document\n\n', 
      path: null 
    };
    setDocuments([...documents, newDoc]);
    setActiveDocument(newDoc.id);
  };

  const handleTabClose = (tabId) => {
    if (documents.length <= 1) return;
    
    const newDocs = documents.filter(doc => doc.id !== tabId);
    setDocuments(newDocs);
    
    if (activeDocument === tabId) {
      setActiveDocument(newDocs[0].id);
    }
  };

  const handleFileOpen = (content, name = '', path = null) => {
    const existingDoc = documents.find(doc => doc.path === path);
    
    if (existingDoc) {
      setActiveDocument(existingDoc.id);
      if (content !== existingDoc.content) {
        handleDocumentChange(existingDoc.id, {
          ...existingDoc,
          content
        });
      }
    } else {
      const newDoc = { 
        id: uuidv4(), 
        name: name || 'Untitled', 
        content, 
        path 
      };
      setDocuments([...documents, newDoc]);
      setActiveDocument(newDoc.id);
    }
  };

  const activeDoc = documents.find(doc => doc.id === activeDocument) || documents[0];

  return (
    <div className="app-container">
      <SideNav 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
      />
      <div className="app-main">
        <Navbar 
          tasks={phase1Tasks} 
          toolbar={
            <Toolbar 
              markdown={activeDoc.content}
              onFileOpen={(content) => handleFileOpen(content)}
            />
          } 
        />
        <TabBar 
          tabs={documents}
          activeTab={activeDocument}
          onTabChange={setActiveDocument}
          onTabClose={handleTabClose}
          onNewTab={handleNewTab}
        />
        <div className="module-container">
          {activeModule === 'editor' && (
            <EditorModule 
              documents={documents}
              activeDocument={activeDocument}
              onDocumentChange={handleDocumentChange}
            />
          )}
          {activeModule !== 'editor' && (
            <div className="coming-soon-module">
              <h2>🚧 Module en développement</h2>
              <p>Cette fonctionnalité sera disponible prochainement !</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;