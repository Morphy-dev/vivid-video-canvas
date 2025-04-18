
import React from 'react';

interface GameFrameProps {
  sessionId: string;
  studentId?: string;
}

const GameFrame: React.FC<GameFrameProps> = ({ sessionId, studentId }) => {
  return (
    <iframe
      src={`https://preview--confetti-square-celebration.lovable.app/?student_session=${sessionId}&student_id=${studentId || ''}`}
      frameBorder="0"
      width="100%"
      height="100%"
      className="absolute inset-0"
      allow="autoplay; fullscreen; vr"
    />
  );
};

export default GameFrame;
