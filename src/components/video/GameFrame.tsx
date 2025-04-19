
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
  const [messageSent, setMessageSent] = useState(false);
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
      console.log('✅ INIT_GAME message sent with:', {
        student_id: studentId || 'default-student',
        student_session: sessionId
      });
      setMessageSent(true);
    } else {
      console.error('❌ Cannot send message - iframe or contentWindow is null');
    }
  };

  // Handle messages from the game
  useEffect(() => {
    const handleGameMessage = (event: MessageEvent) => {
      // Only log messages from our game domain
      if (event.origin.includes('lovable.app')) {
        console.log('📨 Message received from game:', event.data);
        
        if (event.data?.type === "game_finished") {
          console.log("🎮 Game is finished!");
          setIsOpen(false);
        }
        
        // Log acknowledgement if the game confirms receiving the IDs
        if (event.data?.type === "ids_received") {
          console.log("✅ Game confirmed receipt of IDs:", event.data.data);
        }
      }
    };

    window.addEventListener('message', handleGameMessage);
    return () => {
      window.removeEventListener('message', handleGameMessage);
    };
  }, []);

  // Handle iframe load event
  useEffect(() => {
    const handleIframeLoad = () => {
      console.log('🖼️ Iframe loaded successfully');
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
      console.log('📤 Attempting to send IDs to game. Student ID:', studentId, 'Session ID:', sessionId);
      
      // Wait a brief moment to ensure iframe is fully initialized
      const timer = setTimeout(() => {
        sendIdsToGame();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [iframeLoaded, sessionId, studentId]);

  // When dialog reopens, ensure we send IDs again
  useEffect(() => {
    if (isOpen && iframeLoaded) {
      console.log('🔄 Dialog opened/reopened, sending IDs...');
      sendIdsToGame();
    }
  }, [isOpen]);

  // Periodically check if IDs were sent successfully (retry mechanism)
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (iframeLoaded && !messageSent) {
      intervalId = window.setInterval(() => {
        console.log('⏱️ Checking if IDs need to be resent...');
        if (!messageSent) {
          console.log('🔄 Retrying ID transmission...');
          sendIdsToGame();
        } else {
          console.log('✓ IDs already sent, no retry needed');
        }
      }, 2000); // Check every 2 seconds
    }
    
    return () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [iframeLoaded, messageSent]);

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
