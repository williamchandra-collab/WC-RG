import React, { useState, useEffect, useRef, useCallback } from 'react';
import './GameplayScreen.css';
import { getRandomWord } from '../data/wordList';
import { playCorrect, playWrong, playCelebration, playSplash } from '../utils/soundEffects';

const GameplayScreen = ({ onGameOver, onPause }) => {
  // Game state
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [timeLeft, setTimeLeft] = useState(100);
  const [targetWord, setTargetWord] = useState('');
  const [currentProgress, setCurrentProgress] = useState(0); // Index of next letter to catch
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Fishing mechanics
  const [isDragging, setIsDragging] = useState(false);
  const [hookPosition, setHookPosition] = useState(null);
  const [aimPosition, setAimPosition] = useState(null);
  const [isHookCasting, setIsHookCasting] = useState(false);
  const [isHookReturning, setIsHookReturning] = useState(false);
  
  // Fish state
  const [fish, setFish] = useState([]);
  const [difficulty, setDifficulty] = useState(1); // Speed multiplier
  
  // Refs
  const gameAreaRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousWordsRef = useRef([]);
  
  // Initialize game
  useEffect(() => {
    const firstWord = getRandomWord(0, previousWordsRef.current);
    setTargetWord(firstWord);
    previousWordsRef.current.push(firstWord);
    spawnFish(firstWord, 10);
  }, []);
  
  // Timer
  useEffect(() => {
    if (!isGameActive || showCelebration) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsGameActive(false);
          onGameOver(score, wordsCompleted);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isGameActive, showCelebration, score, wordsCompleted, onGameOver]);
  
  // Check if out of hearts
  useEffect(() => {
    if (hearts <= 0) {
      setIsGameActive(false);
      onGameOver(score, wordsCompleted);
    }
  }, [hearts, score, wordsCompleted, onGameOver]);
  
  // Spawn fish with letters
  const spawnFish = useCallback((word, count) => {
    const newFish = [];
    const letters = word.split('');
    
    // Calculate letter distribution (70% correct, 30% random)
    const correctLetterCount = Math.floor(count * 0.7);
    const randomLetterCount = count - correctLetterCount;
    
    // Add correct letters
    for (let i = 0; i < correctLetterCount; i++) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      newFish.push(createFish(randomLetter));
    }
    
    // Add random letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < randomLetterCount; i++) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      newFish.push(createFish(randomLetter));
    }
    
    setFish(newFish);
  }, []);
  
  const createFish = (letter) => {
    return {
      id: Math.random(),
      letter,
      x: Math.random() * window.innerWidth,
      y: 25 + Math.random() * 60, // 25% to 85% of screen height
      direction: Math.random() > 0.5 ? 1 : -1,
      speed: 1 + Math.random() * 0.5,
      size: 40 + Math.random() * 20
    };
  };
  
  // Fish animation
  useEffect(() => {
    if (!isGameActive || showCelebration) return;
    
    const animate = () => {
      setFish(prevFish => 
        prevFish.map(f => {
          let newX = f.x + (f.direction * f.speed * difficulty);
          let newDirection = f.direction;
          
          // Bounce off edges
          if (newX > window.innerWidth + 50) {
            newX = -50;
          } else if (newX < -50) {
            newX = window.innerWidth + 50;
          }
          
          return { ...f, x: newX, direction: newDirection };
        })
      );
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isGameActive, showCelebration, difficulty]);
  
  // Mouse down - start dragging
  const handleMouseDown = (e) => {
    if (isHookCasting || isHookReturning || !isGameActive || showCelebration) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Only start dragging if clicking near the top (boat area)
    if (y < 150) {
      setIsDragging(true);
      setAimPosition({ x, y });
    }
  };
  
  // Mouse move - update aim
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setAimPosition({ x, y });
  };
  
  // Mouse up - cast hook
  const handleMouseUp = () => {
    if (!isDragging || !aimPosition) return;
    
    setIsDragging(false);
    castHook(aimPosition);
    setAimPosition(null);
  };
  
  // Cast hook to target position
  const castHook = (target) => {
    setIsHookCasting(true);
    setHookPosition({ x: window.innerWidth / 2, y: 100 });
    
    // Animate hook to target
    const startPos = { x: window.innerWidth / 2, y: 100 };
    const duration = 500; // ms
    const startTime = Date.now();
    
    const animateHook = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentX = startPos.x + (target.x - startPos.x) * progress;
      const currentY = startPos.y + (target.y - startPos.y) * progress;
      
      setHookPosition({ x: currentX, y: currentY });
      
      // Check collision with fish
      const caughtFish = checkCollision(currentX, currentY);
      if (caughtFish) {
        handleFishCaught(caughtFish);
        returnHook();
        return;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateHook);
      } else {
        // Hook reached target, return
        returnHook();
      }
    };
    
    animateHook();
  };
  
  // Return hook to boat
  const returnHook = () => {
    setIsHookReturning(true);
    
    const startPos = { ...hookPosition };
    const endPos = { x: window.innerWidth / 2, y: 100 };
    const duration = 400;
    const startTime = Date.now();
    
    const animateReturn = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentX = startPos.x + (endPos.x - startPos.x) * progress;
      const currentY = startPos.y + (endPos.y - startPos.y) * progress;
      
      setHookPosition({ x: currentX, y: currentY });
      
      if (progress < 1) {
        requestAnimationFrame(animateReturn);
      } else {
        setIsHookCasting(false);
        setIsHookReturning(false);
        setHookPosition(null);
      }
    };
    
    animateReturn();
  };
  
  // Check collision between hook and fish
  const checkCollision = (hookX, hookY) => {
    const hookRadius = 20;
    
    for (const f of fish) {
      const fishCenterX = f.x;
      const fishCenterY = (f.y / 100) * window.innerHeight;
      const fishRadius = f.size / 2;
      
      const distance = Math.sqrt(
        Math.pow(hookX - fishCenterX, 2) + 
        Math.pow(hookY - fishCenterY, 2)
      );
      
      if (distance < hookRadius + fishRadius) {
        return f;
      }
    }
    
    return null;
  };
  
  // Handle fish caught
  const handleFishCaught = (caughtFish) => {
    const expectedLetter = targetWord[currentProgress];
    
    if (caughtFish.letter === expectedLetter) {
      // Correct letter!
      playSound('correct');
      setScore(prev => prev + 1);
      setCurrentProgress(prev => prev + 1);
      
      // Remove caught fish and spawn new one
      setFish(prevFish => {
        const filtered = prevFish.filter(f => f.id !== caughtFish.id);
        return [...filtered, createFish(targetWord[Math.floor(Math.random() * targetWord.length)])];
      });
      
      // Check if word completed
      if (currentProgress + 1 === targetWord.length) {
        handleWordCompleted();
      }
    } else {
      // Wrong letter!
      playSound('wrong');
      setHearts(prev => prev - 1);
      
      // Remove wrong fish with flash effect
      setFish(prevFish => prevFish.filter(f => f.id !== caughtFish.id));
      
      // Spawn new fish after a delay
      setTimeout(() => {
        setFish(prevFish => [...prevFish, createFish(targetWord[Math.floor(Math.random() * targetWord.length)])]);
      }, 500);
    }
  };
  
  // Handle word completed
  const handleWordCompleted = () => {
    playSound('celebration');
    setScore(prev => prev + 10);
    setWordsCompleted(prev => prev + 1);
    setShowCelebration(true);
    
    // Show celebration for 2 seconds
    setTimeout(() => {
      // Increase difficulty
      setDifficulty(prev => prev + 0.1);
      
      // Get new word
      const newWord = getRandomWord(wordsCompleted + 1, previousWordsRef.current);
      setTargetWord(newWord);
      previousWordsRef.current.push(newWord);
      setCurrentProgress(0);
      
      // Calculate new fish count (add 1 every 3 words, max 15)
      const newFishCount = Math.min(10 + Math.floor((wordsCompleted + 1) / 3), 15);
      spawnFish(newWord, newFishCount);
      
      setShowCelebration(false);
    }, 2000);
  };
  
  // Play sound effects
  const playSound = (type) => {
    switch (type) {
      case 'correct':
        playCorrect();
        playSplash();
        break;
      case 'wrong':
        playWrong();
        break;
      case 'celebration':
        playCelebration();
        break;
      default:
        break;
    }
  };
  
  // Render target word with progress
  const renderTargetWord = () => {
    return targetWord.split('').map((letter, index) => (
      <span 
        key={index} 
        className={`target-letter ${index < currentProgress ? 'completed' : ''}`}
      >
        {letter}
      </span>
    ));
  };
  
  return (
    <div 
      className="gameplay-screen"
      ref={gameAreaRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* HUD */}
      <div className="hud">
        <div className="hud-left">
          <span className="star-count">⭐ {score}</span>
        </div>
        
        <div className="hud-center">
          <div className="target-word">
            {renderTargetWord()}
          </div>
        </div>
        
        <div className="hud-right">
          <div className="hearts">
            {Array(hearts).fill('❤️').map((heart, i) => (
              <span key={i}>{heart}</span>
            ))}
          </div>
          <div className="timer">⏱️ {timeLeft}s</div>
          <button className="pause-button" onClick={onPause}>⏸️</button>
        </div>
      </div>
      
      {/* Boat area */}
      <div className="boat-area">
        <div className="boat-icon">🚤</div>
      </div>
      
      {/* Ocean background */}
      <div className="ocean-bg">
        <div className="water-ripple"></div>
      </div>
      
      {/* Fish */}
      {fish.map(f => (
        <div
          key={f.id}
          className="fish-sprite"
          style={{
            left: `${f.x}px`,
            top: `${f.y}%`,
            fontSize: `${f.size}px`,
            transform: `scaleX(${f.direction})`
          }}
        >
          <span className="fish-body">🐟</span>
          <span className="fish-letter">{f.letter}</span>
        </div>
      ))}
      
      {/* Fishing line and hook */}
      {(isDragging || hookPosition) && (
        <>
          <svg className="fishing-line">
            <line
              x1={window.innerWidth / 2}
              y1={100}
              x2={(isDragging ? aimPosition?.x : hookPosition?.x) || 0}
              y2={(isDragging ? aimPosition?.y : hookPosition?.y) || 0}
              stroke={isDragging ? "rgba(139, 69, 19, 0.5)" : "#8B4513"}
              strokeWidth={isDragging ? "2" : "3"}
              strokeDasharray={isDragging ? "5,5" : "0"}
            />
          </svg>
          <div
            className={`fishing-hook ${isDragging ? 'aiming' : ''}`}
            style={{
              left: `${(isDragging ? aimPosition?.x : hookPosition?.x) || 0}px`,
              top: `${(isDragging ? aimPosition?.y : hookPosition?.y) || 0}px`
            }}
          >
            🪝
          </div>
        </>
      )}
      
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-text">Perfect! 🎉</div>
          <div className="celebration-bonus">+10 ⭐</div>
        </div>
      )}
    </div>
  );
};

export default GameplayScreen;
