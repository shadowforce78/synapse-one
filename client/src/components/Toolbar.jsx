const Toolbar = ({ markdown }) => {
  const handleSave = async () => {
    try {
      const handle = await window.showSaveFilePicker({
        types: [{
          description: 'Markdown',
          accept: { 'text/markdown': ['.md'] },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(markdown);
      await writable.close();
    } catch (err) {
      console.error('Failed to save file:', err);
    }
  };

  const handleOpen = async () => {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: 'Markdown',
          accept: { 'text/markdown': ['.md'] },
        }],
      });
      const file = await handle.getFile();
      const content = await file.text();
      return content;
    } catch (err) {
      console.error('Failed to open file:', err);
      return null;
    }
  };

  return (
    <div className="toolbar">
      <button onClick={handleSave}>💾 Save</button>
      <button onClick={handleOpen}>📂 Open</button>
    </div>
  );
};

export default Toolbar;
