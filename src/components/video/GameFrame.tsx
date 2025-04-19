
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

  // Function to send IDs to the game iframe
  const sendIdsToGame = (iframe: HTMLIFrameElement) => {
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          type: 'INIT_GAME',
          data: {
            student_id: studentId,
            student_session: sessionId,
          }
        },
        '*'
      );
      console.log('Init game message sent to iframe');
    }
  };

  useEffect(() => {
    // Handle messages from the game
    const handleGameMessage = (event: MessageEvent) => {
      if (event.data?.type === "game_finished") {
        console.log("✅ Game is finished!");
        setIsOpen(false);
      }
    };

    // Add event listener for game messages
    window.addEventListener('message', handleGameMessage);

    // Wait for iframe to load before sending the message
    const handleIframeLoad = () => {
      if (iframeRef.current) {
        sendIdsToGame(iframeRef.current);
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
      window.removeEventListener('message', handleGameMessage);
    };
  }, [sessionId, studentId]);

  // When dialog closes and reopens, ensure we send IDs again
  useEffect(() => {
    if (isOpen && iframeRef.current) {
      sendIdsToGame(iframeRef.current);
    }
  }, [isOpen]);

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
