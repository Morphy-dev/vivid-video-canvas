import { useEffect } from 'react';
import { RefObject } from 'react';
import { useVideoTransition } from './video/useVideoTransition';
import { useVideoOverlay } from './video/useVideoOverlay';
import { useIframeState } from './video/useIframeState';
import { useVideoSequenceLogic } from './video/useVideoSequenceLogic';
import { useJumpToVideo } from './video/useJumpToVideo';

interface UseVideoSequenceProps {
  initialSrc: string;
  nextVideoSrc?: string;
  thirdVideoSrc?: string;
  fourthVideoSrc?: string;
  fifthVideoSrc?: string;
  sixthVideoSrc?: string;
  seventhVideoSrc?: string;
  eighthVideoSrc?: string;
  ninthVideoSrc?: string;
  tenthVideoSrc?: string;
  eleventhVideoSrc?: string;
  twelfthVideoSrc?: string;
  thirteenthVideoSrc?: string;
  studentId?: string;
  sessionId: string;
  videoRef: RefObject<HTMLVideoElement>;
  audioRef: RefObject<HTMLAudioElement>;
}

export const useVideoSequence = ({
  initialSrc,
  nextVideoSrc,
  thirdVideoSrc,
  fourthVideoSrc,
  fifthVideoSrc,
  sixthVideoSrc,
  seventhVideoSrc,
  eighthVideoSrc,
  ninthVideoSrc,
  tenthVideoSrc,
  eleventhVideoSrc,
  twelfthVideoSrc,
  thirteenthVideoSrc,
  studentId,
  sessionId,
  videoRef,
  audioRef
}: UseVideoSequenceProps) => {
  const { 
    currentSrc, 
    currentVideoIndex, 
    setCurrentVideoIndex,
    playNextVideo, 
    recordProgress 
  } = useVideoTransition({ 
    initialSrc, 
    studentId, 
    sessionId, 
    videoRef 
  });
  
  const { showOverlay, handleOverlayTransition } = useVideoOverlay({ 
    audioRef 
  });
  
  const { 
    showIframe, 
    setShowIframe, 
    showSecondIframe, 
    setShowSecondIframe,
    showThirdIframe,
    setShowThirdIframe,
    handleGameMessage 
  } = useIframeState();

  const videoSources = {
    nextVideoSrc,
    thirdVideoSrc,
    fourthVideoSrc,
    fifthVideoSrc,
    sixthVideoSrc,
    seventhVideoSrc,
    eighthVideoSrc,
    ninthVideoSrc,
    tenthVideoSrc,
    eleventhVideoSrc,
    twelfthVideoSrc,
    thirteenthVideoSrc
  };

  const { handleVideoSequence } = useVideoSequenceLogic({
    playNextVideo,
    setShowIframe,
    setShowSecondIframe,
    setShowThirdIframe,
    handleOverlayTransition,
    recordProgress
  });

  const { jumpToVideo } = useJumpToVideo({
    setShowIframe,
    setShowSecondIframe,
    setCurrentVideoIndex,
    recordProgress,
    videoRef
  });

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      handleGameMessage(event, seventhVideoSrc, eighthVideoSrc, playNextVideo);
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, [showIframe, showSecondIframe, showThirdIframe, seventhVideoSrc, eighthVideoSrc]);

  useEffect(() => {
    const handleEnded = () => {
      handleVideoSequence(currentSrc, currentVideoIndex, videoSources);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentVideoIndex, currentSrc, videoSources, handleVideoSequence, videoRef]);

  useEffect(() => {
    if (studentId) {
      recordProgress(initialSrc);
    }
  }, [studentId, initialSrc, recordProgress]);

  const jumpToVideoWrapper = (index: number) => jumpToVideo(index, {
    initialSrc,
    ...videoSources
  });

  return {
    currentSrc,
    currentVideoIndex,
    showOverlay,
    showIframe,
    showSecondIframe,
    showThirdIframe,
    jumpToVideo: jumpToVideoWrapper
  };
};
