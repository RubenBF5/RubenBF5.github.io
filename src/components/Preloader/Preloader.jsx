import { useState, useEffect } from 'react';
import './Preloader.css';

const LOG_MESSAGES = [
  { max: 25, text: 'booting_system.sh...' },
  { max: 50, text: 'loading_ui_components.jsx...' },
  { max: 75, text: 'connecting_grpc_tunnel.go...' },
  { max: 95, text: 'compiling_assets_production...' },
  { max: 100, text: 'all_systems_ready_zsh_active' }
];

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [statusLog, setStatusLog] = useState('booting_system.sh...');

  useEffect(() => {
    let current = 0;
    
    // Simulate organic counting speed
    const timer = setInterval(() => {
      const increment = Math.floor(Math.random() * 4) + 1;
      current = Math.min(current + increment, 100);
      setCount(current);

      // Update developer logs as it loads
      const currentLog = LOG_MESSAGES.find(log => current <= log.max);
      if (currentLog) {
        setStatusLog(currentLog.text);
      }

      if (current === 100) {
        clearInterval(timer);
        // Pause briefly at 100% to let user see "ready" status
        setTimeout(() => {
          setIsFading(true);
          // Wait for fade transition (500ms) before unmounting/completing
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 500);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`preloader ${isFading ? 'preloader--fade-out' : ''}`}>
      <div className="preloader__content">
        
        {/* Large monospaced percentage counter */}
        <div className="preloader__counter display-text">
          <span className="gradient-text">{count}</span>
          <span className="preloader__pct">%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="preloader__progress-container">
          <div 
            className="preloader__progress-bar" 
            style={{ width: `${count}%` }}
          />
        </div>

        {/* Developer Loading Log */}
        <div className="preloader__status mono-text">
          <span className="preloader__prompt">ruben@portafolio ~ % </span>
          <span className="preloader__status-text">{statusLog}</span>
          <span className="preloader__cursor">_</span>
        </div>

      </div>
    </div>
  );
}
