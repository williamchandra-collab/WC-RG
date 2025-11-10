import React from 'react';
import './InstructionsOverlay.css';

const InstructionsOverlay = ({ onClose }) => {
  return (
    <div className="instructions-overlay" onClick={onClose}>
      <div className="instructions-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <h2>How to Play</h2>
        
        <div className="instruction-item">
          <span className="instruction-icon">🎣</span>
          <p><strong>Click and drag</strong> from the boat to aim, then <strong>release</strong> to cast your hook and catch fish with letters</p>
        </div>
        
        <div className="instruction-item">
          <span className="instruction-icon">🔤</span>
          <p>Hook fish letters <strong>in sequence</strong> to spell the target word shown at the top</p>
        </div>
        
        <div className="instruction-item">
          <span className="instruction-icon">⭐</span>
          <p><strong>+1 star</strong> per correct letter, <strong>+10 stars</strong> per complete word</p>
        </div>
        
        <div className="instruction-item">
          <span className="instruction-icon">❤️</span>
          <p>You have <strong>3 hearts</strong> - lose 1 for each wrong letter hooked</p>
        </div>
        
        <div className="instruction-item">
          <span className="instruction-icon">⏱️</span>
          <p><strong>100 seconds</strong> to catch as many words as possible!</p>
        </div>
        
        <div className="instruction-tip">
          💡 <strong>Tip:</strong> The game gets harder as you progress - fish swim faster and words get longer!
        </div>
      </div>
    </div>
  );
};

export default InstructionsOverlay;
