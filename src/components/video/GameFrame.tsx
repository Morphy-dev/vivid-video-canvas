
import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface GameFrameProps {
  sessionId: string;
  studentId?: string;
}

const GameFrame: React.FC<GameFrameProps> = ({ sessionId, studentId }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const gameUrl = 'https://preview--confetti-square-celebration.lovable.app';

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
          '*' // Using '*' to allow any origin to receive the message
        );
        console.log('Init game message sent to iframe');
      }
    };

    // Handle messages from the game
    const handleGameMessage = (event: MessageEvent) => {
      console.log('Message received:', event); // Log all received messages
      console.log('Origin:', event.origin); // Log the origin of the message
      console.log('Message data:', event.data); // Log the message data

      // Accept messages from any origin that have the correct message type
      if (event.data && event.data.type === 'GAME_COMPLETE') {
        console.log('Game complete message received'); // Confirm game complete message
        
        // Add a 7-second delay before closing the iframe
        setTimeout(() => {
          setIsOpen(false);
        }, 7000);
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      window.addEventListener('message', handleGameMessage);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
      window.removeEventListener('message', handleGameMessage);
    };
  }, [sessionId, studentId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-6xl p-0" onInteractOutside={(e) => e.preventDefault()}>
        <DialogTitle className="sr-only">Game</DialogTitle>
        <iframe
          ref={iframeRef}
          src={gameUrl}
          frameBorder="0"
          width="100%"
          height="100%"
          className="aspect-video"
          allow="autoplay; fullscreen; vr"
        />
      </DialogContent>
    </Dialog>
  );
};

export default GameFrame;
