import { useEffect, useRef, useState } from 'react';
import MarkdownIt from 'markdown-it';

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
  content = content.replace(blockMathRegex, (match, latex) => {
    return `<div class="katex-block" data-latex="${encodeURIComponent(latex)}"></div>`;
  });
  content = content.replace(inlineMathRegex, (match, latex) => {
    return `<span class="katex-inline" data-latex="${encodeURIComponent(latex)}"></span>`;
  });
  return content;
};

const PreviewPanel = ({ markdown }) => {
  const [renderedContent, setRenderedContent] = useState('');
  const containerRef = useRef(null);
  const previousMarkdownRef = useRef('');

  // Premier rendu Markdown quand le contenu change
  useEffect(() => {
    // Normalisation pour éviter les problèmes avec les espaces
    const normalizedMarkdown = (markdown || '') + '\n';
    
    // Ne mettre à jour que si le contenu a réellement changé après normalisation
    if (normalizedMarkdown !== previousMarkdownRef.current) {
      previousMarkdownRef.current = normalizedMarkdown;
      setRenderedContent(md.render(normalizedMarkdown));
    }
  }, [markdown]);

  // Rendu LaTeX après le rendu markdown
  useEffect(() => {
    const renderLatex = async () => {
      if (!containerRef.current || !window.katex) return;

      // Attendre un cycle pour s'assurer que le DOM est stable
      await new Promise(resolve => setTimeout(resolve, 0));

      // Sélectionner tous les éléments LaTeX non traités
      const elements = containerRef.current.querySelectorAll('[data-latex]:not([data-processed])');
      
      elements.forEach(element => {
        try {
          const latex = decodeURIComponent(element.getAttribute('data-latex'));
          const displayMode = element.classList.contains('katex-block');
          
          window.katex.render(latex, element, {
            displayMode,
            throwOnError: false,
            output: 'html'
          });
          
          element.setAttribute('data-processed', 'true');
        } catch (error) {
          console.error('LaTeX render error:', error);
          element.textContent = `Error: ${error.message}`;
        }
      });
    };

    renderLatex();
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
