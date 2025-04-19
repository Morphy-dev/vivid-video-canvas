
import { useEffect, RefObject } from 'react';
import { useVideoTransition } from './video/useVideoTransition';
import { useVideoOverlay } from './video/useVideoOverlay';
import { useIframeState } from './video/useIframeState';

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

interface VideoSequenceState {
  currentSrc: string;
  currentVideoIndex: number;
  showOverlay: boolean;
  showIframe: boolean;
  showSecondIframe: boolean;
  jumpToVideo: (index: number) => void;
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
}: UseVideoSequenceProps): VideoSequenceState => {
  const { 
    currentSrc, 
    currentVideoIndex, 
    setCurrentVideoIndex,
    playNextVideo, 
    recordProgress 
  } = useVideoTransition({ initialSrc, studentId, sessionId, videoRef });
  
  const { showOverlay, handleOverlayTransition } = useVideoOverlay({ audioRef });
  
  const { 
    showIframe, 
    setShowIframe, 
    showSecondIframe, 
    setShowSecondIframe,
    handleGameMessage 
  } = useIframeState();

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      handleGameMessage(event, seventhVideoSrc, playNextVideo);
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, [showIframe, showSecondIframe, seventhVideoSrc]);

  const handleVideoSequence = async (currentSrc: string, index: number) => {
    await recordProgress(currentSrc, true);
    
    switch (index) {
      case 1:
        if (nextVideoSrc) {
          await handleOverlayTransition();
          await playNextVideo(nextVideoSrc, 2);
        }
        break;
      case 2:
        if (thirdVideoSrc) await playNextVideo(thirdVideoSrc, 3);
        break;
      case 3:
        if (fourthVideoSrc) await playNextVideo(fourthVideoSrc, 4);
        break;
      case 4:
        if (fifthVideoSrc) await playNextVideo(fifthVideoSrc, 5);
        break;
      case 5:
        if (sixthVideoSrc) await playNextVideo(sixthVideoSrc, 6);
        break;
      case 6:
        setShowIframe(true);
        break;
      case 7:
        if (eighthVideoSrc) await playNextVideo(eighthVideoSrc, 8);
        break;
      case 8:
        if (ninthVideoSrc) await playNextVideo(ninthVideoSrc, 9);
        break;
      case 9:
        if (tenthVideoSrc) await playNextVideo(tenthVideoSrc, 10);
        break;
      case 10:
        if (eleventhVideoSrc) await playNextVideo(eleventhVideoSrc, 11);
        break;
      case 11:
        if (twelfthVideoSrc) await playNextVideo(twelfthVideoSrc, 12);
        break;
      case 12:
        if (thirteenthVideoSrc) await playNextVideo(thirteenthVideoSrc, 13);
        break;
      case 13:
        await recordProgress(thirteenthVideoSrc!, true);
        break;
    }
  };

  useEffect(() => {
    const handleEnded = () => {
      handleVideoSequence(currentSrc, currentVideoIndex);
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
  }, [currentVideoIndex, nextVideoSrc, thirdVideoSrc, fourthVideoSrc, fifthVideoSrc, sixthVideoSrc, currentSrc]);

  useEffect(() => {
    if (studentId) {
      recordProgress(initialSrc);
    }
  }, [studentId, initialSrc]);

  const jumpToVideo = async (index: number) => {
    setShowIframe(false);
    setShowSecondIframe(false);
    
    let newSrc: string | undefined;
    
    switch (index) {
      case 1: newSrc = initialSrc; break;
      case 2: newSrc = nextVideoSrc; break;
      case 3: newSrc = thirdVideoSrc; break;
      case 4: newSrc = fourthVideoSrc; break;
      case 5: newSrc = fifthVideoSrc; break;
      case 6: newSrc = sixthVideoSrc; break;
      case 7: newSrc = seventhVideoSrc; break;
      case 8: newSrc = eighthVideoSrc; break;
      case 9: newSrc = ninthVideoSrc; break;
      case 10: newSrc = tenthVideoSrc; break;
      case 11: newSrc = eleventhVideoSrc; break;
      case 12: newSrc = twelfthVideoSrc; break;
      case 13: newSrc = thirteenthVideoSrc; break;
    }
    
    if (newSrc) {
      setCurrentVideoIndex(index);
      await recordProgress(newSrc);
      
      if (index === 6) {
        setShowIframe(true);
      } else if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  return {
    currentSrc,
    currentVideoIndex,
    showOverlay,
    showIframe,
    showSecondIframe,
    jumpToVideo
  };
};
