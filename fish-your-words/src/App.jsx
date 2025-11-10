import { useState, useEffect } from 'react';
import StartScreen from './screens/StartScreen';
import GameplayScreen from './screens/GameplayScreen';
import GameOverScreen from './screens/GameOverScreen';
import InstructionsOverlay from './components/InstructionsOverlay';
import PauseOverlay from './components/PauseOverlay';
import './App.css';

const GAME_STATES = {
  START: 'start',
  PLAYING: 'playing',
  PAUSED: 'paused',
  GAME_OVER: 'game_over'
};

const HIGH_SCORE_KEY = 'fishYourWords_highScore';

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.START);
  const [showInstructions, setShowInstructions] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [lastWordsCompleted, setLastWordsCompleted] = useState(0);
  
  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);
  
  // Save high score to localStorage
  const saveHighScore = (score) => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    }
  };
  
  const handleStartGame = () => {
    setGameState(GAME_STATES.PLAYING);
  };
  
  const handleShowInstructions = () => {
    setShowInstructions(true);
  };
  
  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };
  
  const handlePause = () => {
    setGameState(GAME_STATES.PAUSED);
  };
  
  const handleResume = () => {
    setGameState(GAME_STATES.PLAYING);
  };
  
  const handleRestart = () => {
    setGameState(GAME_STATES.PLAYING);
    // Force re-render by updating key
    setLastScore(0);
    setLastWordsCompleted(0);
  };
  
  const handleGameOver = (score, wordsCompleted) => {
    setLastScore(score);
    setLastWordsCompleted(wordsCompleted);
    saveHighScore(score);
    setGameState(GAME_STATES.GAME_OVER);
  };
  
  const handlePlayAgain = () => {
    setGameState(GAME_STATES.PLAYING);
  };
  
  const handleMainMenu = () => {
    setGameState(GAME_STATES.START);
  };
  
  const handleQuitToMenu = () => {
    setGameState(GAME_STATES.START);
  };
  
  return (
    <div className="app">
      {gameState === GAME_STATES.START && (
        <StartScreen
          onStartGame={handleStartGame}
          highScore={highScore}
          onShowInstructions={handleShowInstructions}
        />
      )}
      
      {gameState === GAME_STATES.PLAYING && (
        <GameplayScreen
          key={`game-${lastScore}-${lastWordsCompleted}`}
          onGameOver={handleGameOver}
          onPause={handlePause}
        />
      )}
      
      {gameState === GAME_STATES.PAUSED && (
        <>
          <GameplayScreen
            onGameOver={handleGameOver}
            onPause={handlePause}
          />
          <PauseOverlay
            onResume={handleResume}
            onRestart={handleRestart}
            onQuit={handleQuitToMenu}
          />
        </>
      )}
      
      {gameState === GAME_STATES.GAME_OVER && (
        <GameOverScreen
          score={lastScore}
          wordsCompleted={lastWordsCompleted}
          highScore={highScore}
          onPlayAgain={handlePlayAgain}
          onMainMenu={handleMainMenu}
        />
      )}
      
      {showInstructions && (
        <InstructionsOverlay onClose={handleCloseInstructions} />
      )}
    </div>
  );
}

export default App;
