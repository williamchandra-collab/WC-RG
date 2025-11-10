import React from 'react';
import './StartScreen.css';

const StartScreen = ({ onStartGame, highScore, onShowInstructions }) => {
  return (
    <div className="start-screen">
      {/* Sky gradient background */}
      <div className="sky"></div>
      
      {/* Sun */}
      <div className="sun"></div>
      
      {/* Ocean */}
      <div className="ocean">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
      
      {/* Boat */}
      <div className="boat">
        <div className="boat-placeholder">🚤</div>
      </div>
      
      {/* Ambient fish */}
      <div className="ambient-fish fish-1">🐟</div>
      <div className="ambient-fish fish-2">🐠</div>
      <div className="ambient-fish fish-3">🐡</div>
      
      {/* UI Panel */}
      <div className="start-panel">
        <h1 className="game-title">Fish Your Words</h1>
        <p className="game-subtitle">English Academy by Ruangguru</p>
        
        <div className="high-score-display">
          🏆 High Score: {highScore} ⭐
        </div>
        
        <button className="play-button" onClick={onStartGame}>
          PLAY
        </button>
        
        <div className="bottom-buttons">
          <button className="how-to-play-button" onClick={onShowInstructions}>
            How to Play
          </button>
          <button className="settings-button">
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
