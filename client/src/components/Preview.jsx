import MarkdownIt from 'markdown-it';
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const PreviewPanel = ({ markdown }) => {
  return (
    <div className="preview-container">
      <div 
        className="preview markdown-body"
        dangerouslySetInnerHTML={{ __html: md.render(markdown || '') }}
      />
    </div>
  );
};

export default PreviewPanel;
