import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ tasks, toolbar }) => {
  const { isDark, setIsDark } = useTheme();
  const completedTasks = tasks.filter(task => task.done).length;
  const progress = (completedTasks / tasks.length) * 100;

  return (
    <nav className={`navbar ${isDark ? 'dark' : 'light'}`}>
      <div className="navbar-content">
        <div className="navbar-left">
          <h1>Synapse One</h1>
          <div className="progress-container">
            <div className="progress-text">
              Phase 1: {completedTasks}/{tasks.length}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="navbar-right">
          {toolbar}
          <button
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
