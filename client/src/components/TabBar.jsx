import { useState } from 'react';
import './TabBar.css';

const TabBar = ({ tabs, activeTab, onTabChange, onTabClose, onNewTab }) => {
  return (
    <div className="tab-bar">
      <div className="tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-name">{tab.name || 'Untitled'}</span>
            {tabs.length > 1 && (
              <button
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      <button className="new-tab" onClick={onNewTab}>+</button>
    </div>
  );
};

export default TabBar;
