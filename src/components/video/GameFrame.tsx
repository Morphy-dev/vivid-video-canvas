
import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface GameFrameProps {
  sessionId: string;
  studentId?: string;
}

const GameFrame: React.FC<GameFrameProps> = ({ sessionId, studentId }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setIsOpen] = useState(true);

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

    // Handle messages from the game
    const handleGameMessage = (event: MessageEvent) => {
      if (event.origin === 'https://preview--confetti-square-celebration.lovable.app') {
        if (event.data.type === 'GAME_COMPLETE') {
          setIsOpen(false);
        }
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
        <iframe
          ref={iframeRef}
          src="https://preview--confetti-square-celebration.lovable.app"
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

