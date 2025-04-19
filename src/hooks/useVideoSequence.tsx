import { useState, useEffect, RefObject } from 'react';
import useVideoProgress from './useVideoProgress';

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
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [showSecondIframe, setShowSecondIframe] = useState(false);
  
  const { recordProgress } = useVideoProgress(studentId, sessionId);

  useEffect(() => {
    const handleGameMessage = (event: MessageEvent) => {
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
        }
      }
    };

    window.addEventListener('message', handleGameMessage);
    return () => window.removeEventListener('message', handleGameMessage);
  }, [showIframe, showSecondIframe, seventhVideoSrc]);

  const playNextVideo = async (nextSrc: string, nextIndex: number) => {
    setCurrentSrc(nextSrc);
    setCurrentVideoIndex(nextIndex);
    await recordProgress(nextSrc);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

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
  }, [studentId, initialSrc, recordProgress]);

  return {
    currentSrc,
    currentVideoIndex,
    showOverlay,
    showIframe,
    showSecondIframe
  };
};
