import { useCallback } from 'react';

interface UseVideoSequenceLogicProps {
  playNextVideo: (nextSrc: string, nextIndex: number) => Promise<void>;
  setShowIframe: (show: boolean) => void;
  setShowSecondIframe: (show: boolean) => void;
  setShowThirdIframe: (show: boolean) => void;
  handleOverlayTransition: () => Promise<void>;
  recordProgress: (src: string, completed?: boolean) => Promise<void>;
}

interface VideoSources {
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

export const useVideoSequenceLogic = ({
  playNextVideo,
  setShowIframe,
  setShowSecondIframe,
  setShowThirdIframe,
  handleOverlayTransition,
  recordProgress
}: UseVideoSequenceLogicProps) => {
  const handleVideoSequence = useCallback(async (
    currentSrc: string,
    index: number,
    videos: VideoSources
  ) => {
    const {
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

    await recordProgress(currentSrc, true);
    
    switch (index) {
      case 1:
        if (nextVideoSrc) {
          // We don't need overlay transition for the first video
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
        setShowThirdIframe(true);
        break;
      case 8:
        if (eighthVideoSrc) await playNextVideo(eighthVideoSrc, 8);
        break;
      case 9:
        if (ninthVideoSrc) await playNextVideo(ninthVideoSrc, 9);
        break;
      case 10:
        if (tenthVideoSrc) await playNextVideo(tenthVideoSrc, 10);
        break;
      case 11:
        if (eleventhVideoSrc) await playNextVideo(eleventhVideoSrc, 11);
        break;
      case 12:
        if (twelfthVideoSrc) await playNextVideo(twelfthVideoSrc, 12);
        break;
      case 13:
        if (thirteenthVideoSrc) {
          await recordProgress(thirteenthVideoSrc, true);
        }
        break;
    }
  }, [playNextVideo, setShowIframe, setShowSecondIframe, setShowThirdIframe, handleOverlayTransition, recordProgress]);

  return { handleVideoSequence };
};
