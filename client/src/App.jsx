import { useState } from 'react';
import EditorPanel from './components/Editor';
import PreviewPanel from './components/Preview';
import SplitView from './components/Layout/SplitView';
import './assets/styles/editor.css';
import './assets/styles/preview.css';
import './assets/styles/themes.css';

function App() {
  const [markdown, setMarkdown] = useState('# Welcome to Synapse One\n\nStart typing your markdown here...');
  const phase1Tasks = [
    { id: 1, text: 'Interface avec éditeur Markdown + preview', done: true },
    { id: 2, text: 'Rendu live avec markdown-it', done: false },
    { id: 3, text: 'Mode clair / sombre', done: false },
    { id: 4, text: 'Sauvegarde locale (.md)', done: false },
    { id: 5, text: 'Chargement / ouverture fichier .md', done: false },
    { id: 6, text: 'Export PDF', done: false },
    { id: 7, text: 'UI simple et propre', done: false },
  ];

  const completedTasks = phase1Tasks.filter(task => task.done).length;
  const progress = (completedTasks / phase1Tasks.length) * 100;

  return (
    <>
      <header style={{
        background: '#2c2c2c',
        padding: '20px',
        color: 'white'
      }}>
        <h1 style={{ margin: '0 0 15px 0', fontSize: '1.5em' }}>Synapse One - Phase 1</h1>
        <div style={{ background: '#444', borderRadius: '10px', padding: '15px' }}>
          <div style={{ marginBottom: '10px' }}>
            Progression: {completedTasks}/{phase1Tasks.length} ({Math.round(progress)}%)
          </div>
          <div style={{ background: '#666', borderRadius: '5px' }}>
            <div style={{
              width: `${progress}%`,
              height: '10px',
              background: '#4CAF50',
              borderRadius: '5px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <ul style={{ 
            listStyle: 'none', 
            padding: '10px 0 0 0',
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '10px'
          }}>
            {phase1Tasks.map(task => (
              <li key={task.id} style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '8px' 
              }}>
                <input
                  type="checkbox"
                  checked={task.done}
                  readOnly
                />
                <span style={{ opacity: task.done ? 0.6 : 1 }}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <SplitView>
        <EditorPanel markdown={markdown} setMarkdown={setMarkdown} />
        <PreviewPanel markdown={markdown || ''} />
      </SplitView>
    </>
  );
}

export default App;