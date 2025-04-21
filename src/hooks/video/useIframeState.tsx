
import { useState, useCallback } from 'react';

export const useIframeState = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [showSecondIframe, setShowSecondIframe] = useState(false);

  const handleFirstGameComplete = useCallback(() => {
    console.log("First game completed, showing second iframe");
    setShowIframe(false);
    setShowSecondIframe(true);
  }, []);

  const handleSecondGameComplete = useCallback((seventhVideoSrc: string | undefined, playNextVideo: (src: string, index: number) => void) => {
    console.log("Second game completed, playing seventh video");
    setShowSecondIframe(false);
    if (seventhVideoSrc) {
      playNextVideo(seventhVideoSrc, 7);
    }
  }, []);

  // This function is kept for backward compatibility but we'll use the direct callbacks instead
  const handleGameMessage = (event: MessageEvent, seventhVideoSrc: string | undefined, playNextVideo: (src: string, index: number) => void) => {
    console.log('Received message from iframe:', event.data);
    
    if (event.data?.type === "game_finished") {
      console.log("✅ Game is finished!");
      if (showIframe) {
        handleFirstGameComplete();
      } else if (showSecondIframe) {
        handleSecondGameComplete(seventhVideoSrc, playNextVideo);
      }
    }
  };

  return {
    showIframe,
    setShowIframe,
    showSecondIframe,
    setShowSecondIframe,
    handleFirstGameComplete,
    handleSecondGameComplete,
    handleGameMessage
  };
};
