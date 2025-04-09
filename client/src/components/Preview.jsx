import { useEffect, useRef, useState } from 'react';
import MarkdownIt from 'markdown-it';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'sans-serif'
});

// Regex pour détecter les expressions LaTeX
const inlineMathRegex = /\$([^\$]+)\$/g;
const blockMathRegex = /\$\$([^\$]+)\$\$/g;

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// Personnalisation du rendu markdown pour LaTeX
md.renderer.rules.text = (tokens, idx) => {
  let content = tokens[idx].content;
  
  // Remplacer les blocs LaTeX
  content = content.replace(blockMathRegex, (match, latex) => {
    return `<div class="katex-block" data-latex="${encodeURIComponent(latex)}"></div>`;
  });
  
  // Remplacer les expressions LaTeX inline
  content = content.replace(inlineMathRegex, (match, latex) => {
    return `<span class="katex-inline" data-latex="${encodeURIComponent(latex)}"></span>`;
  });
  
  return content;
};

// Personnalisation pour Mermaid
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
    setRenderedContent(md.render(markdown || ''));
  }, [markdown]);

  useEffect(() => {
    if (!containerRef.current || !window.katex) return;

    // Rendu des expressions LaTeX
    const renderLatex = () => {
      const elements = containerRef.current.querySelectorAll('[data-latex]');
      elements.forEach(element => {
        if (element.getAttribute('data-processed')) return;
        
        try {
          const latex = decodeURIComponent(element.getAttribute('data-latex'));
          const displayMode = element.classList.contains('katex-block');
          window.katex.render(latex, element, {
            displayMode,
            throwOnError: false
          });
          element.setAttribute('data-processed', 'true');
        } catch (error) {
          console.error('LaTeX render error:', error);
          element.textContent = error.message;
        }
      });
    };

    renderLatex();
    
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
