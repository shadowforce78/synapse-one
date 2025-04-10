import { useState } from 'react';
import EditorPanel from './components/Editor';
import PreviewPanel from './components/Preview';
import SplitView from './components/Layout/SplitView';
import Toolbar from './components/Toolbar';
import Navbar from './components/Navbar';
import './assets/styles/editor.css';
import './assets/styles/preview.css';
import './assets/styles/themes.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const { isDark, setIsDark } = useTheme();
  const [markdown, setMarkdown] = useState(`# Welcome to Synapse One

Start typing your markdown here...

## Exemple de formule LaTeX

Soit l'équation quadratique : $ax^2 + bx + c = 0$

La solution est donnée par : $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$
`);

  const phase1Tasks = [
    { id: 1, text: 'Interface avec éditeur Markdown + preview', done: true },
    { id: 2, text: 'Rendu live avec markdown-it', done: true },
    { id: 3, text: 'Mode clair / sombre', done: true },
    { id: 4, text: 'Sauvegarde locale (.md)', done: true },
    { id: 5, text: 'Chargement / ouverture fichier .md', done: true },
    { id: 6, text: 'Prise en charge de LaTeX', done: true },
    { id: 7, text: 'Export PDF', done: false },
    { id: 8, text: 'UI simple et propre', done: false }
  ];

  const completedTasks = phase1Tasks.filter(task => task.done).length;
  const progress = (completedTasks / phase1Tasks.length) * 100;

  return (
    <>
      <Navbar 
        tasks={phase1Tasks} 
        toolbar={
          <Toolbar 
            markdown={markdown} 
            onFileOpen={setMarkdown}
          />
        } 
      />
      <main className="app-content">
        <SplitView>
          <EditorPanel markdown={markdown} setMarkdown={setMarkdown} />
          <PreviewPanel markdown={markdown || ''} />
        </SplitView>
      </main>
    </>
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