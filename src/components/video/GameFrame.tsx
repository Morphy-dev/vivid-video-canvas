
import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface GameFrameProps {
  sessionId: string;
  studentId?: string;
}

const GameFrame: React.FC<GameFrameProps> = ({ sessionId, studentId }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const gameUrl = 'https://preview--confetti-square-celebration.lovable.app';

  // Function to send IDs to the game iframe
  const sendIdsToGame = () => {
    if (iframeRef.current?.contentWindow) {
      const message = {
        type: 'INIT_GAME',
        data: {
          student_id: studentId || 'default-student',
          student_session: sessionId,
        }
      };
      
      iframeRef.current.contentWindow.postMessage(message, '*');
      console.log('Init game message sent to iframe with data:', JSON.stringify(message.data));
    } else {
      console.error('Cannot send message - iframe or contentWindow is null');
    }
  };

  useEffect(() => {
    // Handle messages from the game
    const handleGameMessage = (event: MessageEvent) => {
      console.log('Received message from iframe:', event.data);
      
      if (event.data?.type === "game_finished") {
        console.log("✅ Game is finished!");
        setIsOpen(false);
      }
    };

    // Add event listener for game messages
    window.addEventListener('message', handleGameMessage);

    return () => {
      window.removeEventListener('message', handleGameMessage);
    };
  }, []);

  // Handle iframe load event
  useEffect(() => {
    const handleIframeLoad = () => {
      console.log('Iframe loaded, setting loaded state to true');
      setIframeLoaded(true);
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
  }, []);

  // Send IDs to the game when the iframe is loaded or when IDs change
  useEffect(() => {
    if (iframeLoaded) {
      console.log('Iframe is loaded, sending IDs...');
      sendIdsToGame();
    }
  }, [iframeLoaded, sessionId, studentId]);

  // When dialog closes and reopens, ensure we send IDs again
  useEffect(() => {
    if (isOpen && iframeLoaded) {
      console.log('Dialog opened, sending IDs...');
      sendIdsToGame();
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
