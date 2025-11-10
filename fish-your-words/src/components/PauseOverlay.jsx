import React from 'react';
import './PauseOverlay.css';

const PauseOverlay = ({ onResume, onRestart, onQuit }) => {
  return (
    <div className="pause-overlay">
      <div className="pause-panel">
        <h2>GAME PAUSED</h2>
        
        <div className="pause-buttons">
          <button className="pause-btn resume-btn" onClick={onResume}>
            ▶️ Resume
          </button>
          <button className="pause-btn restart-btn" onClick={onRestart}>
            🔄 Restart
          </button>
          <button className="pause-btn quit-btn" onClick={onQuit}>
            🏠 Quit to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseOverlay;
