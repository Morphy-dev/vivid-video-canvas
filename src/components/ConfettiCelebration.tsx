
import React from 'react';
import JSConfetti from 'js-confetti';
import { Button } from "@/components/ui/button";

const ConfettiCelebration = () => {
  const handleClick = () => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8 animate-bounce">
        ¡Celebración!
      </h1>
      <Button 
        onClick={handleClick}
        className="bg-white text-purple-600 hover:bg-purple-100 text-lg px-8 py-4 rounded-full shadow-lg transform transition hover:scale-105"
      >
        ¡Lanza confeti! 🎉
      </Button>
    </div>
  );
};

export default ConfettiCelebration;
