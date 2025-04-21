
import { useState, useCallback } from "react";

/**
 * Manages the transition between video index, intro frame, and video playback.
 */
export const useVideoIntroSequence = (initialShowIndex: boolean = true) => {
  // Show the index first
  const [showIndex, setShowIndex] = useState(initialShowIndex);
  // Only show intro AFTER index is closed
  const [showIntroFrame, setShowIntroFrame] = useState(false);

  const handleIndexClose = useCallback(() => {
    setShowIndex(false);
    setShowIntroFrame(true); // Now show intro frame
  }, []);

  const handleIntroFinish = useCallback(() => {
    setShowIntroFrame(false);
    // Now the video will be shown
  }, []);

  return {
    showIndex,
    setShowIndex,
    showIntroFrame,
    setShowIntroFrame,
    handleIndexClose,
    handleIntroFinish
  };
};
