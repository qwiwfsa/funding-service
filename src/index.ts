// Entry point
import './index.css';
import { initApp } from './main';

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// Also try to initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initApp();
}
