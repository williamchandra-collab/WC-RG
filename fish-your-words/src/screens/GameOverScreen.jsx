import React, { useState, useEffect } from 'react';
import './GameOverScreen.css';

const GameOverScreen = ({ score, wordsCompleted, highScore, onPlayAgain, onMainMenu }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showHighScore, setShowHighScore] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
  const isNewHighScore = score > highScore;
  
  // Get performance message
  const getPerformanceMessage = () => {
    if (isNewHighScore) {
      return {
        title: "🏆 NEW RECORD! 🏆",
        message: "You're a master word fisher!",
        className: "new-record"
      };
    }
    
    const percentage = highScore > 0 ? (score / highScore) * 100 : 100;
    
    if (percentage >= 90) {
      return {
        title: "⭐ EXCELLENT CATCH! ⭐",
        message: "Almost there! Keep fishing!",
        className: "excellent"
      };
    } else if (percentage >= 70) {
      return {
        title: "🎣 GREAT FISHING! 🎣",
        message: "You're getting better!",
        className: "great"
      };
    } else if (percentage >= 50) {
      return {
        title: "🐟 GOOD EFFORT! 🐟",
        message: "Practice makes perfect!",
        className: "good"
      };
    } else {
      return {
        title: "🌊 KEEP SWIMMING! 🌊",
        message: "Every fisher starts somewhere!",
        className: "keep-trying"
      };
    }
  };
  
  const performance = getPerformanceMessage();
  
  // Typewriter animation sequence
  useEffect(() => {
    const sequence = [
      { delay: 300, action: () => setShowTitle(true) },
      { delay: 800, action: () => setShowScore(true) },
      { delay: 1000, action: () => {
        // Animate score counting
        let current = 0;
        const increment = Math.ceil(score / 30);
        const interval = setInterval(() => {
          current += increment;
          if (current >= score) {
            setAnimatedScore(score);
            clearInterval(interval);
          } else {
            setAnimatedScore(current);
          }
        }, 30);
      }},
      { delay: 2500, action: () => setShowHighScore(true) },
      { delay: 3000, action: () => setShowMessage(true) },
      { delay: 3500, action: () => setShowButtons(true) }
    ];
    
    sequence.forEach(({ delay, action }) => {
      setTimeout(action, delay);
    });
  }, [score]);
  
  return (
    <div className="game-over-screen">
      {/* Background - same as start screen */}
      <div className="sky"></div>
      <div className="sun"></div>
      <div className="ocean">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
      <div className="boat">
        <div className="boat-placeholder">🚤</div>
      </div>
      
      {/* Ambient fish */}
      <div className="ambient-fish fish-1">🐟</div>
      <div className="ambient-fish fish-2">🐠</div>
      
      {/* Results panel */}
      <div className="results-panel">
        {showTitle && (
          <h1 className={`results-title ${performance.className}`}>
            {performance.title}
          </h1>
        )}
        
        {showTitle && <div className="divider"></div>}
        
        {showScore && (
          <div className="score-section">
            <div className="score-label">YOUR SCORE</div>
            <div className="score-value">⭐ {animatedScore}</div>
          </div>
        )}
        
        {showScore && <div className="divider"></div>}
        
        {showHighScore && (
          <div className="high-score-section">
            <div className="high-score-label">
              {isNewHighScore ? "🏆 NEW HIGH SCORE! 🏆" : "🏆 HIGH SCORE"}
            </div>
            <div className="high-score-value">
              {isNewHighScore ? (
                <>
                  <div className="new-high-score">⭐ {score}</div>
                  <div className="previous-score">(Previous: {highScore})</div>
                </>
              ) : (
                <>
                  <div>⭐ {highScore}</div>
                  <div className="score-gap">
                    {highScore - score > 0 && `${highScore - score} stars away!`}
                  </div>
                </>
              )}
            </div>
            {isNewHighScore && (
              <div className="confetti-container">
                {Array(20).fill(0).map((_, i) => (
                  <div key={i} className="confetti" style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${2 + Math.random()}s`
                  }}>
                    ⭐
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {showMessage && (
          <div className="motivation-message">
            {performance.message}
          </div>
        )}
        
        {showMessage && <div className="divider"></div>}
        
        {showButtons && (
          <div className="button-group">
            <button className="play-again-button" onClick={onPlayAgain}>
              PLAY AGAIN
            </button>
            <button className="main-menu-button" onClick={onMainMenu}>
              MAIN MENU
            </button>
          </div>
        )}
        
        {/* Bubbles animation */}
        <div className="bubbles-container">
          {Array(15).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="bubble"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
