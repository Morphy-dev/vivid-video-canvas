
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
  ...props
}: UseVideoSequenceProps) => {
  const { 
    currentSrc, 
    currentVideoIndex, 
    setCurrentVideoIndex,
    playNextVideo, 
    recordProgress 
  } = useVideoTransition({ 
    initialSrc, 
    studentId: props.studentId, 
    sessionId: props.sessionId, 
    videoRef: props.videoRef 
  });
  
  const { showOverlay, handleOverlayTransition } = useVideoOverlay({ 
    audioRef: props.audioRef 
  });
  
  const { 
    showIframe, 
    setShowIframe, 
    showSecondIframe, 
    setShowSecondIframe,
    handleGameMessage 
  } = useIframeState();

  const { handleVideoSequence } = useVideoSequenceLogic({
    playNextVideo,
    setShowIframe,
    handleOverlayTransition,
    recordProgress // Pass recordProgress to useVideoSequenceLogic
  });

  const { jumpToVideo } = useJumpToVideo({
    setShowIframe,
    setShowSecondIframe,
    setCurrentVideoIndex,
    recordProgress,
    videoRef: props.videoRef
  });

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      handleGameMessage(event, props.seventhVideoSrc, playNextVideo);
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, [showIframe, showSecondIframe, props.seventhVideoSrc]);

  useEffect(() => {
    const handleEnded = () => {
      handleVideoSequence(currentSrc, currentVideoIndex, props);
    };

    const video = props.videoRef.current;
    if (video) {
      video.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (video) {
        video.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentVideoIndex, currentSrc, props]);

  useEffect(() => {
    if (props.studentId) {
      recordProgress(initialSrc);
    }
  }, [props.studentId, initialSrc]);

  const jumpToVideoWrapper = (index: number) => jumpToVideo(index, {
    initialSrc,
    ...props
  });

  return {
    currentSrc,
    currentVideoIndex,
    showOverlay,
    showIframe,
    showSecondIframe,
    jumpToVideo: jumpToVideoWrapper
  };
};
