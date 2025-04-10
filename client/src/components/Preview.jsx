import { useEffect, useRef, useState } from 'react';
import MarkdownIt from 'markdown-it';
import React from 'react';

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
