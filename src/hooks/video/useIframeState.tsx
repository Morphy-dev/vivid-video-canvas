
import { useState, useEffect } from 'react';

export const useIframeState = () => {
  const [showIframe, setShowIframe] = useState(false);
  const [showSecondIframe, setShowSecondIframe] = useState(false);
  const [showThirdIframe, setShowThirdIframe] = useState(false);

  const handleGameMessage = (event: MessageEvent, seventhVideoSrc: string | undefined, playNextVideo: (src: string, index: number) => void) => {
    console.log('Received message from iframe:', event.data);
    
    if (event.data?.type === "game_finished") {
      console.log("✅ Game is finished!");
      if (showIframe) {
        setShowIframe(false);
        setShowSecondIframe(true);
      } else if (showSecondIframe) {
        setShowSecondIframe(false);
        if (seventhVideoSrc) {
          playNextVideo(seventhVideoSrc, 7);
        }
      } else if (showThirdIframe && eighthVideoSrc) {
        setShowThirdIframe(false);
        if (eighthVideoSrc) {
          playNextVideo(eighthVideoSrc, 8);
        }
      }
    }
  };

  return {
    showIframe,
    setShowIframe,
    showSecondIframe,
    setShowSecondIframe,
    showThirdIframe,
    setShowThirdIframe,
    handleGameMessage
  };
};
