
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const ConfettiGame = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [squares, setSquares] = useState<HTMLDivElement[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [attemptNumber, setAttemptNumber] = useState(0);

  useEffect(() => {
    const spawnSquare = () => {
      if (containerRef.current && !isGameOver) {
        const square = document.createElement('div');
        square.className = 'absolute w-8 h-8 bg-yellow-400 animate-fall cursor-pointer';
        square.style.left = `${Math.random() * (containerRef.current.clientWidth - 32)}px`;
        square.style.top = '-32px';
        containerRef.current.appendChild(square);
        setSquares(prev => [...prev, square]);

        const fallAnimation = square.animate(
          [
            { transform: 'translateY(0)' },
            { transform: `translateY(${containerRef.current.clientHeight}px)` }
          ],
          {
            duration: 3000,
            easing: 'linear'
          }
        );

        fallAnimation.onfinish = () => {
          setIsGameOver(true);
          square.remove();
          setSquares(prev => prev.filter(s => s !== square));
        };

        square.onclick = async () => {
          square.remove();
          setSquares(prev => prev.filter(s => s !== square));
          setScore(prev => prev + 1);
          setAttemptNumber(prev => prev + 1);
          
          try {
            await supabase.from('weather_play').insert({
              session_id: sessionId,
              attempt_number: attemptNumber + 1,
              is_correct: true,
              attempt_timestamp: new Date().toISOString()
            });
          } catch (error) {
            console.error('Error recording score:', error);
          }
        };
      }
    };

    const interval = setInterval(spawnSquare, 1000);
    return () => clearInterval(interval);
  }, [isGameOver, sessionId, attemptNumber]);

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      <div ref={containerRef} className="w-full h-full relative">
        <div className="absolute top-4 left-4 text-white text-2xl">
          Score: {score}
        </div>
        {isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="text-white text-4xl">Game Over! Score: {score}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfettiGame;
