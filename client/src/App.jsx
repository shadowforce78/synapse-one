import { useState } from 'react';
import EditorPanel from './components/Editor';
import PreviewPanel from './components/Preview';
import SplitView from './components/Layout/SplitView';
import './styles/editor.css';
import './styles/preview.css';
import './styles/themes.css';

function App() {
  const [markdown, setMarkdown] = useState('');

  return (
    <SplitView>
      <EditorPanel markdown={markdown} setMarkdown={setMarkdown} />
      <PreviewPanel markdown={markdown} />
    </SplitView>
  );
}

export default App;