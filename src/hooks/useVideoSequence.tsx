
import { useState, useEffect, RefObject } from 'react';
import useVideoProgress from './useVideoProgress';

interface UseVideoSequenceProps {
  initialSrc: string;
  nextVideoSrc?: string;
  thirdVideoSrc?: string;
  fourthVideoSrc?: string;
  fifthVideoSrc?: string;
  sixthVideoSrc?: string;
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
}

export const useVideoSequence = ({
  initialSrc,
  nextVideoSrc,
  thirdVideoSrc,
  fourthVideoSrc,
  fifthVideoSrc,
  sixthVideoSrc,
  studentId,
  sessionId,
  videoRef,
  audioRef
}: UseVideoSequenceProps): VideoSequenceState => {
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  
  const { recordProgress } = useVideoProgress(studentId, sessionId);

  useEffect(() => {
    const handleEnded = async () => {
      if (currentVideoIndex === 1 && nextVideoSrc) {
        await recordProgress(initialSrc, true);
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
        setCurrentSrc(nextVideoSrc);
        setCurrentVideoIndex(2);
        await recordProgress(nextVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 2 && thirdVideoSrc) {
        await recordProgress(nextVideoSrc!, true);
        setCurrentSrc(thirdVideoSrc);
        setCurrentVideoIndex(3);
        await recordProgress(thirdVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 3 && fourthVideoSrc) {
        await recordProgress(thirdVideoSrc!, true);
        setCurrentSrc(fourthVideoSrc);
        setCurrentVideoIndex(4);
        await recordProgress(fourthVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 4 && fifthVideoSrc) {
        await recordProgress(fourthVideoSrc!, true);
        setCurrentSrc(fifthVideoSrc);
        setCurrentVideoIndex(5);
        await recordProgress(fifthVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 5 && sixthVideoSrc) {
        await recordProgress(fifthVideoSrc!, true);
        setCurrentSrc(sixthVideoSrc);
        setCurrentVideoIndex(6);
        await recordProgress(sixthVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 6) {
        await recordProgress(sixthVideoSrc!, true);
        setShowIframe(true);
      }
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
  }, [currentVideoIndex, nextVideoSrc, thirdVideoSrc, fourthVideoSrc, fifthVideoSrc, sixthVideoSrc, initialSrc, recordProgress, videoRef, audioRef]);

  useEffect(() => {
    if (studentId) {
      recordProgress(initialSrc);
    }
  }, [studentId, initialSrc, recordProgress]);

  return {
    currentSrc,
    currentVideoIndex,
    showOverlay,
    showIframe
  };
};

