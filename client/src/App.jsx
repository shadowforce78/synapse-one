import { useState } from 'react';
import EditorPanel from './components/Editor';
import PreviewPanel from './components/Preview';
import SplitView from './components/Layout/SplitView';
import './styles/editor.css';
import './styles/preview.css';
import './styles/themes.css';

function App() {
  // Initialize with a default welcome message
  const [markdown, setMarkdown] = useState('# Welcome to Synapse One\n\nStart typing your markdown here...');

  return (
    <>
      <header style={{ background: '#eee', padding: '10px', textAlign: 'center' }}>
        Application Loaded
      </header>
      <SplitView>
        <EditorPanel markdown={markdown} setMarkdown={setMarkdown} />
        <PreviewPanel markdown={markdown || ''} />
      </SplitView>
    </>
  );
}

export default App;