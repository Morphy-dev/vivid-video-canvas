
import { useState } from 'react';

interface UseVideoOverlayProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const useVideoOverlay = ({ audioRef }: UseVideoOverlayProps) => {
  const [showOverlay, setShowOverlay] = useState(false);

  // For overlays after video 1, not first scene (will not show for video 1)
  const handleOverlayTransition = async () => {
    setShowOverlay(true);

    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1.0;
        await audioRef.current.play();
      } catch (error) {
        console.error("Audio playback error:", error);
      }
    }

    await new Promise(resolve => setTimeout(resolve, 4000));
    setShowOverlay(false);
  };

  return {
    showOverlay,
    handleOverlayTransition
  };
};
