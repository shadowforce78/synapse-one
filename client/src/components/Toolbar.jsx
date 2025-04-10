import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import PDFExportModal from './PDFExportModal';
import './Toolbar.css';

const Toolbar = ({ markdown, onFileOpen }) => {
  const [showPdfModal, setShowPdfModal] = useState(false);

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
      onFileOpen(content); // Appel de la callback avec le contenu
    } catch (err) {
      console.error('Failed to open file:', err);
    }
  };

  const handlePdfButtonClick = () => {
    setShowPdfModal(true);
  };

  const handleExportPDF = (config) => {
    // Fermer le modal
    setShowPdfModal(false);
    
    // Sélectionner le contenu à exporter
    const element = document.querySelector('.preview.markdown-body');
    if (!element) return;

    // Forcer le thème clair pour l'export
    const originalTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Créer une copie profonde de l'élément
    const clone = element.cloneNode(true);
    const tempContainer = document.createElement('div');
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';

    // Supprimer tout le bloc conditionnel pour le thème sombre

    // Ajouter la numérotation des pages si nécessaire
    if (config.pageNumbers) {
      const style = document.createElement('style');
      style.textContent = `
        @page {
          margin-bottom: 10mm;
        }
        .html2pdf__page-footer {
          position: absolute;
          bottom: 10px;
          width: 100%;
          text-align: center;
          font-size: 10px;
          color: #666;
        }
      `;
      clone.appendChild(style);
    }

    // Configuration de html2pdf
    const opt = {
      margin: [config.margins.top, config.margins.right, config.margins.bottom, config.margins.left],
      filename: config.filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: parseInt(config.quality), useCORS: true },
      jsPDF: { unit: 'mm', format: config.pageSize, orientation: config.orientation },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Ajouter le footer avec numérotation si nécessaire
    if (config.pageNumbers) {
      opt.html2canvas.letterRendering = true;
      opt.html2canvas.allowTaint = true;
      opt.pagebreak.after = '.page-break';
      opt.footer = {
        height: '10mm',
        contents: {
          default: '<div class="html2pdf__page-footer">Page {{page}} of {{pages}}</div>'
        }
      };
    }

    // Générer le PDF
    html2pdf().set(opt).from(clone).save().then(() => {
      // Nettoyer
      document.body.removeChild(tempContainer);
      document.documentElement.setAttribute('data-theme', originalTheme);
    });
  };

  return (
    <>
      <div className="toolbar">
        <button onClick={handleSave}>💾 Save</button>
        <button onClick={handleOpen}>📂 Open</button>
        <button onClick={handlePdfButtonClick}>📄 Export PDF</button>
      </div>
      <PDFExportModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        onExport={handleExportPDF}
      />
    </>
  );
};

export default Toolbar;
