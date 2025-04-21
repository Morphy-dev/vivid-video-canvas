import React, { useRef, useState, useEffect } from 'react';
import { useVideoSequence } from '../../hooks/useVideoSequence';
import { getCurrentDayAssets } from '../../utils/dayAssets';
import VideoContainer from './VideoContainer';
import VideoIndex from './VideoIndex';
import GameFrame from './GameFrame';
import IntroFrame from "./IntroFrame";

const INTRO_IMAGE_URL = "https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/public/other//Semana01_Escena-06-v3.png";

const VideoWrapper = ({
  src,
  className = '',
  autoPlay = false,
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
  ...videoProps
}) => {
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

  // PRE-VIDEO AUDIO: new!
  const introAudioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [showIndex, setShowIndex] = useState(true);

  // PRE-VIDEO: Show intro image and day image state.
  const [showIntroFrame, setShowIntroFrame] = useState(true);

  // Day-specific assets
  const dayAssets = getCurrentDayAssets();

  // Show intro frame before the first video
  // const [showIntroImage, setShowIntroImage] = useState(true);

  // Use intro effect only once at component mount
  useEffect(() => {
    // On mount, show intro frame; reset first video to paused.
    setShowIntroFrame(true);
    setIsPlaying(false);
    // Don't preload/play here, handled in IntroFrame
  }, []);

  // After intro frame is gone and not showing index, play video automatically
  useEffect(() => {
    if (!showIntroFrame && !showIndex && videoRef.current && !isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
    // eslint-disable-next-line
  }, [showIntroFrame, showIndex]);

  // useVideoSequence hook MUST come after dayAssets for audioRef
  const { 
    currentSrc, 
    showOverlay, 
    showIframe, 
    showSecondIframe,
    currentVideoIndex,
    jumpToVideo
  } = useVideoSequence({
    initialSrc: src,
    studentId: videoProps.studentId,
    sessionId,
    videoRef,
    audioRef: nextVideoRef, // not needed for the intro anymore
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
    ...videoProps
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
    jumpToVideo(index);
    setShowIndex(false);
  };

  // Define available videos for the index
  const availableVideos = [
    { index: 1, label: "Video 1", src },
    { index: 2, label: "Video 2", src: videoProps.nextVideoSrc },
    { index: 3, label: "Video 3", src: videoProps.thirdVideoSrc },
    { index: 4, label: "Video 4", src: videoProps.fourthVideoSrc },
    { index: 5, label: "Video 5", src: videoProps.fifthVideoSrc },
    { index: 6, label: "Video 6", src: videoProps.sixthVideoSrc },
    { index: 7, label: "Video 7", src: videoProps.seventhVideoSrc },
    { index: 8, label: "Video 8", src: videoProps.eighthVideoSrc },
    { index: 9, label: "Video 9", src: videoProps.ninthVideoSrc },
    { index: 10, label: "Video 10", src: videoProps.tenthVideoSrc },
    { index: 11, label: "Video 11", src: videoProps.eleventhVideoSrc },
    { index: 12, label: "Video 12", src: videoProps.twelfthVideoSrc },
    { index: 13, label: "Video 13", src: videoProps.thirteenthVideoSrc },
  ].filter(video => video.src);

  // IntroFrame: show only BEFORE the first video
  if (showIntroFrame && !showIndex) {
    return (
      <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
        <IntroFrame
          show={true}
          onFinish={() => setShowIntroFrame(false)}
          dayImage={dayAssets.image}
          daySound={dayAssets.sound}
          backgroundUrl={INTRO_IMAGE_URL}
        />
      </div>
    );
  }

  if (showIndex) {
    return (
      <VideoIndex 
        videos={availableVideos}
        onSelect={handleIndexSelect}
        onFirstVideo={() => setShowIndex(false)}
      />
    );
  }

  const preloadedSources = [
    videoProps.nextVideoSrc,
    videoProps.thirdVideoSrc,
    videoProps.fourthVideoSrc,
    videoProps.fifthVideoSrc,
    videoProps.sixthVideoSrc,
    videoProps.seventhVideoSrc,
    videoProps.eighthVideoSrc,
    videoProps.ninthVideoSrc,
    videoProps.tenthVideoSrc,
    videoProps.eleventhVideoSrc,
    videoProps.twelfthVideoSrc,
    videoProps.thirteenthVideoSrc
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

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        {!showIframe && !showSecondIframe && (
          <VideoContainer
            currentSrc={currentSrc}
            isPlaying={isPlaying}
            showOverlay={
              // Only show overlay for days after video 1
              currentVideoIndex !== 1 && showOverlay
            }
            onPlayPause={handlePlayPause}
            onFullscreen={handleFullscreen}
            onShowIndex={() => setShowIndex(true)}
            preloadedSources={preloadedSources}
            preloadedRefs={preloadedRefs}
            videoRef={videoRef}
            overlayImageSrc={dayAssets.image}
            showDayOverlay={false}
          />
        )}
        {showIframe && (
          <GameFrame
            sessionId={sessionId}
            studentId={videoProps.studentId}
            gameUrl="https://preview--confetti-square-celebration.lovable.app"
          />
        )}
        {showSecondIframe && (
          <GameFrame
            sessionId={sessionId}
            studentId={videoProps.studentId}
            gameUrl="https://preview--item-picker-fall.lovable.app"
          />
        )}
      {/* Remove audio/post-intro overlays. All day content is now ONLY in intro frame. */}
      </div>
    </div>
  );
};

export default VideoWrapper;
