
import { useRef, useState, useEffect } from 'react';
import { useVideoSequence } from '../hooks/useVideoSequence'; // note, hook import remains correct location
import { getCurrentDayAssets } from '../utils/dayAssets';

const INTRO_IMAGE_URL = "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/public/other//Semana01_Escena-06-v3.png";

export const useVideoWrapperController = (videoProps: any) => {
  const {
    src,
    className,
    autoPlay,
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
    ...restProps
  } = videoProps;

  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const thirdVideoRef = useRef<HTMLVideoElement>(null);
  const fourthVideoRef = useRef<HTMLVideoElement>(null);
  const fifthVideoRef = useRef<HTMLVideoElement>(null);
  const sixthVideoRef = useRef<HTMLVideoElement>(null);
  const seventhVideoRef = useRef<HTMLVideoElement>(null);
  const eighthVideoRef = useRef<HTMLVideoElement>(null);
  const ninthVideoRef = useRef<HTMLVideoElement>(null);
  const tenthVideoRef = useRef<HTMLVideoElement>(null);
  const eleventhVideoRef = useRef<HTMLVideoElement>(null);
  const twelfthVideoRef = useRef<HTMLVideoElement>(null);
  const thirteenthVideoRef = useRef<HTMLVideoElement>(null);

  // PRE-VIDEO: Show intro image and day image state.
  const [showIntroFrame, setShowIntroFrame] = useState(true);
  const [showIndex, setShowIndex] = useState(true);
  const [isPlaying, setIsPlaying] = useState(!!autoPlay);
  const [sessionId] = useState(() => crypto.randomUUID());

  // Day-specific assets
  const dayAssets = getCurrentDayAssets();

  useEffect(() => {
    setShowIntroFrame(true);
    setIsPlaying(false);
    // Don't preload/play here, handled in IntroFrame
  }, []);

  useEffect(() => {
    if (!showIntroFrame && !showIndex && videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
    // eslint-disable-next-line
  }, [showIntroFrame, showIndex]);

  const sequence = useVideoSequence({
    initialSrc: src,
    studentId,
    sessionId,
    videoRef,
    audioRef: nextVideoRef,
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
    ...restProps
  });

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleIndexSelect = (index: number) => {
    sequence.jumpToVideo(index);
    setShowIndex(false);
  };

  const availableVideos = [
    { index: 1, label: "Video 1", src },
    { index: 2, label: "Video 2", src: nextVideoSrc },
    { index: 3, label: "Video 3", src: thirdVideoSrc },
    { index: 4, label: "Video 4", src: fourthVideoSrc },
    { index: 5, label: "Video 5", src: fifthVideoSrc },
    { index: 6, label: "Video 6", src: sixthVideoSrc },
    { index: 7, label: "Video 7", src: seventhVideoSrc },
    { index: 8, label: "Video 8", src: eighthVideoSrc },
    { index: 9, label: "Video 9", src: ninthVideoSrc },
    { index: 10, label: "Video 10", src: tenthVideoSrc },
    { index: 11, label: "Video 11", src: eleventhVideoSrc },
    { index: 12, label: "Video 12", src: twelfthVideoSrc },
    { index: 13, label: "Video 13", src: thirteenthVideoSrc },
  ].filter(video => video.src);

  const preloadedSources = [
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
  ];

  const preloadedRefs = [
    nextVideoRef,
    thirdVideoRef,
    fourthVideoRef,
    fifthVideoRef,
    sixthVideoRef,
    seventhVideoRef,
    eighthVideoRef,
    ninthVideoRef,
    tenthVideoRef,
    eleventhVideoRef,
    twelfthVideoRef,
    thirteenthVideoRef
  ];

  return {
    showIntroFrame,
    setShowIntroFrame,
    showIndex,
    setShowIndex,
    isPlaying,
    setIsPlaying,
    className,
    videoRef,
    preloadedSources,
    preloadedRefs,
    availableVideos,
    dayAssets,
    handlePlayPause,
    handleFullscreen,
    handleIndexSelect,
    sequence,
    sessionId,
    studentId,
    INTRO_IMAGE_URL
  };
};
