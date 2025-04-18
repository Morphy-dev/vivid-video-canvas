
import React, { useState, useEffect } from 'react';
import JSConfetti from 'js-confetti';
import { supabase } from "../integrations/supabase/client";

interface ConfettiGameProps {
  sessionId: string;
}

const ConfettiGame: React.FC<ConfettiGameProps> = ({ sessionId }) => {
  const [squares, setSquares] = useState<{ id: number; color: string }[]>([]);
  const [targetColor, setTargetColor] = useState<string>('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

  const jsConfetti = new JSConfetti();

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    // Generate 9 squares with random colors
    const newSquares = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setSquares(newSquares);
    
    // Select one of the colors as the target
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
  };

  const handleSquareClick = async (color: string) => {
    setAttempts(attempts + 1);
    const isCorrect = color === targetColor;
    
    // Record attempt in Supabase
    try {
      await supabase.from('weather_play').insert({
        session_id: sessionId,
        attempt_number: attempts + 1,
        is_correct: isCorrect
      });
    } catch (error) {
      console.error('Error saving attempt:', error);
    }

    if (isCorrect) {
      // Celebrate correct answer
      jsConfetti.addConfetti({
        confettiColors: [color]
      });
      setScore(score + 1);
      
      // Start new round after a short delay
      setTimeout(() => {
        startNewRound();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Confetti Color Game</h1>
        <p className="text-xl mb-4">Find all squares with the color: <span className="font-bold" style={{ color: targetColor }}>{targetColor}</span></p>
        <div className="mb-4">
          <p>Score: {score} | Attempts: {attempts}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {squares.map((square) => (
          <div
            key={square.id}
            className="w-24 h-24 rounded cursor-pointer transition-transform hover:scale-105"
            style={{ backgroundColor: square.color }}
            onClick={() => handleSquareClick(square.color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ConfettiGame;
