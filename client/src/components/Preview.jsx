import { useEffect, useRef, useState } from 'react';
import MarkdownIt from 'markdown-it';
import mk from 'markdown-it-katex';
import mermaid from 'mermaid';
import 'katex/dist/katex.min.css';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'sans-serif'
});

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(mk);

// Personnalisation du rendu des blocs de code
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  if (token.info.trim() === 'mermaid') {
    return `<pre class="mermaid-container"><div class="mermaid">${token.content}</div></pre>`;
  }
  return self.renderToken(tokens, idx, options);
};

const PreviewPanel = ({ markdown }) => {
  const [renderedContent, setRenderedContent] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    // Premier rendu Markdown
    setRenderedContent(md.render(markdown || ''));
  }, [markdown]);

  useEffect(() => {
    const renderMermaid = async () => {
      if (!containerRef.current) return;

      // Attendre que le DOM soit stable
      await new Promise(resolve => setTimeout(resolve, 0));

      const mermaidDivs = containerRef.current.querySelectorAll('.mermaid');

      for (const div of mermaidDivs) {
        if (div.getAttribute('data-processed')) continue;

        try {
          const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}`;
          div.id = id;

          await mermaid.render(id, div.textContent).then(({ svg }) => {
            div.innerHTML = svg;
            div.setAttribute('data-processed', 'true');
          });
        } catch (error) {
          console.error('Mermaid render error:', error);
          div.innerHTML = `<pre class="error">Diagram parsing error</pre>`;
        }
      }
    };

    renderMermaid();
  }, [renderedContent]);

  return (
    <div className="preview-container">
      <div
        ref={containerRef}
        className="preview markdown-body"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </div>
  );
};

export default PreviewPanel;
