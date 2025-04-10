import { useState } from 'react';
import './SideNav.css';

const SideNav = ({ activeModule, onModuleChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const modules = [
    { id: 'editor', icon: '📝', name: 'Editor', available: true },
    { id: 'files', icon: '📁', name: 'Files', available: false },
    { id: 'search', icon: '🔍', name: 'Search', available: false },
    { id: 'dashboard', icon: '📊', name: 'Dashboard', available: false },
    { id: 'automation', icon: '⚙️', name: 'Automation', available: false },
    { id: 'flashcards', icon: '🎓', name: 'Flashcards', available: false },
    { id: 'settings', icon: '⚙️', name: 'Settings', available: false }
  ];

  return (
    <div className={`side-nav ${collapsed ? 'collapsed' : ''}`}>
      <div className="side-nav-header">
        <div className="app-logo">
          {collapsed ? '🧠' : <span>🧠 Synapse One</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <div className="side-nav-modules">
        {modules.map(module => (
          <div 
            key={module.id}
            className={`module-item ${activeModule === module.id ? 'active' : ''} ${!module.available ? 'disabled' : ''}`}
            onClick={() => module.available && onModuleChange(module.id)}
          >
            <div className="module-icon">{module.icon}</div>
            {!collapsed && <div className="module-name">{module.name}</div>}
            {!collapsed && !module.available && <div className="coming-soon">Soon</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
