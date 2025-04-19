
import React, { useRef, useState } from 'react';
import { useVideoSequence } from '../../hooks/useVideoSequence';
import { getCurrentDayAssets } from '../../utils/dayAssets';
import VideoContainer from './VideoContainer';
import VideoIndex from './VideoIndex';
import GameFrame from './GameFrame';

interface VideoWrapperProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
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
}

const VideoWrapper: React.FC<VideoWrapperProps> = ({
  src,
  className = '',
  autoPlay = false,
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
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [showIndex, setShowIndex] = useState(true);
  
  const dayAssets = getCurrentDayAssets();

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
    audioRef,
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
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        {!showIframe && !showSecondIframe && (
          <VideoContainer
            currentSrc={currentSrc}
            isPlaying={isPlaying}
            showOverlay={showOverlay}
            onPlayPause={handlePlayPause}
            onFullscreen={handleFullscreen}
            onShowIndex={() => setShowIndex(true)}
            preloadedSources={preloadedSources}
            preloadedRefs={preloadedRefs}
            videoRef={videoRef}
            overlayImageSrc={dayAssets.image}
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

        <audio 
          ref={audioRef} 
          src={dayAssets.sound}
          preload="auto"
        />
      </div>
    </div>
  );
};

export default VideoWrapper;
