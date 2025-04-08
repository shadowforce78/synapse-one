const PreviewPanel = ({ markdown }) => {
  return (
    <div className="preview-container">
      <div className="preview">
        {markdown}
      </div>
    </div>
  );
};

export default PreviewPanel;
