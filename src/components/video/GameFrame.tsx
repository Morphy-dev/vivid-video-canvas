
import React, { useEffect, useRef } from 'react';

interface GameFrameProps {
  sessionId: string;
  studentId?: string;
}

const GameFrame: React.FC<GameFrameProps> = ({ sessionId, studentId }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Wait for iframe to load before sending the message
    const handleIframeLoad = () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: 'INIT_GAME',
            data: {
              student_id: studentId,
              student_session: sessionId,
            }
          },
          'https://preview--confetti-square-celebration.lovable.app'
        );
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [sessionId, studentId]);

  return (
    <iframe
      ref={iframeRef}
      src="https://preview--confetti-square-celebration.lovable.app"
      frameBorder="0"
      width="100%"
      height="100%"
      className="absolute inset-0"
      allow="autoplay; fullscreen; vr"
    />
  );
};

export default GameFrame;

