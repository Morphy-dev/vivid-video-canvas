
import { useCallback } from 'react';
import { RefObject } from 'react';

interface UseJumpToVideoProps {
  setShowIframe: (show: boolean) => void;
  setShowSecondIframe: (show: boolean) => void;
  setCurrentVideoIndex: (index: number) => void;
  recordProgress: (src: string) => Promise<void>;
  videoRef: RefObject<HTMLVideoElement>;
}

interface VideoSources {
  initialSrc?: string;
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
}

export const useJumpToVideo = ({
  setShowIframe,
  setShowSecondIframe,
  setCurrentVideoIndex,
  recordProgress,
  videoRef
}: UseJumpToVideoProps) => {
  const jumpToVideo = useCallback(async (
    index: number,
    videos: VideoSources
  ) => {
    setShowIframe(false);
    setShowSecondIframe(false);
    
    let newSrc: string | undefined;
    const {
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
      thirteenthVideoSrc
    } = videos;
    
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
  }, [setShowIframe, setShowSecondIframe, setCurrentVideoIndex, recordProgress, videoRef]);

  return { jumpToVideo };
};
