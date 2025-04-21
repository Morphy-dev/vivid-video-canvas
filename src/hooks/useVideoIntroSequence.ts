
import { useState, useCallback } from "react";

export const useVideoIntroSequence = (initialShowIndex: boolean = false) => {
  const [showIndex, setShowIndex] = useState(initialShowIndex);
  const [showIntroFrame, setShowIntroFrame] = useState(true);

  const handleIndexClose = useCallback(() => {
    setShowIndex(false);
    setShowIntroFrame(true);
  }, []);

  const handleIntroFinish = useCallback(() => {
    setShowIntroFrame(false);
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
