
import { useState, RefObject } from 'react';
import useVideoProgress from '../useVideoProgress';

interface UseVideoTransitionProps {
  initialSrc: string;
  studentId?: string;
  sessionId: string;
  videoRef: RefObject<HTMLVideoElement>;
}

export const useVideoTransition = ({
  initialSrc,
  studentId,
  sessionId,
  videoRef
}: UseVideoTransitionProps) => {
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const { recordProgress } = useVideoProgress(studentId, sessionId);

  const playNextVideo = async (nextSrc: string, nextIndex: number) => {
    setCurrentSrc(nextSrc);
    setCurrentVideoIndex(nextIndex);
    await recordProgress(nextSrc);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return {
    currentSrc,
    currentVideoIndex,
    setCurrentVideoIndex,
    playNextVideo,
    recordProgress
  };
};
