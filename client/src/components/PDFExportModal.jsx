import { useState } from 'react';
import './PDFExportModal.css';

const PDFExportModal = ({ isOpen, onClose, onExport }) => {
  const [config, setConfig] = useState({
    filename: 'document.pdf',
    pageNumbers: true,
    margins: {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15
    },
    pageSize: 'a4',
    orientation: 'portrait',
    quality: 2
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('margins.')) {
      const margin = name.split('.')[1];
      setConfig({
        ...config,
        margins: {
          ...config.margins,
          [margin]: Number(value)
        }
      });
    } else {
      setConfig({
        ...config,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onExport(config);
  };

  return (
    <div className="pdf-modal-overlay">
      <div className="pdf-modal">
        <div className="pdf-modal-header">
          <h3>PDF Export Configuration</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Filename</label>
              <input
                type="text"
                name="filename"
                value={config.filename}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label>Page Size</label>
              <select name="pageSize" value={config.pageSize} onChange={handleChange}>
                <option value="a4">A4</option>
                <option value="letter">Letter</option>
                <option value="legal">Legal</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Orientation</label>
              <select name="orientation" value={config.orientation} onChange={handleChange}>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quality</label>
              <select name="quality" value={config.quality} onChange={handleChange}>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </div>
            
            <div className="form-group checkbox">
              <input
                type="checkbox"
                name="pageNumbers"
                checked={config.pageNumbers}
                onChange={handleChange}
                id="pageNumbers"
              />
              <label htmlFor="pageNumbers">Add page numbers</label>
            </div>
            
            <div className="margin-group">
              <h4>Margins (mm)</h4>
              <div className="margins-grid">
                <div className="form-group">
                  <label>Top</label>
                  <input
                    type="number"
                    name="margins.top"
                    value={config.margins.top}
                    onChange={handleChange}
                    min="0"
                    max="50"
                  />
                </div>
                <div className="form-group">
                  <label>Right</label>
                  <input
                    type="number"
                    name="margins.right"
                    value={config.margins.right}
                    onChange={handleChange}
                    min="0"
                    max="50"
                  />
                </div>
                <div className="form-group">
                  <label>Bottom</label>
                  <input
                    type="number"
                    name="margins.bottom"
                    value={config.margins.bottom}
                    onChange={handleChange}
                    min="0"
                    max="50"
                  />
                </div>
                <div className="form-group">
                  <label>Left</label>
                  <input
                    type="number"
                    name="margins.left"
                    value={config.margins.left}
                    onChange={handleChange}
                    min="0"
                    max="50"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="export-button">Export PDF</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PDFExportModal;
