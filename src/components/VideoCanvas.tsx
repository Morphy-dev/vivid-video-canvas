
import React, { useRef, useState } from 'react';
import VideoControls from './VideoControls';
import VideoOverlay from './video/VideoOverlay';
import PreloadedVideos from './video/PreloadedVideos';
import GameFrame from './video/GameFrame';
import { useVideoSequence } from '../hooks/useVideoSequence';
import { getCurrentDayAssets } from '../utils/dayAssets';
import VideoIndex from './video/VideoIndex';

interface VideoCanvasProps {
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

const VideoCanvas: React.FC<VideoCanvasProps> = ({
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
  studentId
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

  if (showIndex) {
    return (
      <VideoIndex 
        videos={availableVideos}
        onSelect={handleIndexSelect}
        onFirstVideo={() => setShowIndex(false)}
      />
    );
  }

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        {!showIframe && !showSecondIframe && (
          <>
            <video 
              ref={videoRef} 
              src={currentSrc} 
              onClick={handlePlayPause} 
              autoPlay={autoPlay} 
              preload="auto" 
              className="absolute inset-0 w-full h-full object-contain" 
            />
            
            <PreloadedVideos
              sources={[
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
              ]}
              refs={[
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
              ]}
            />
            
            <VideoOverlay show={showOverlay} imageSrc={dayAssets.image} />
            
            <audio 
              ref={audioRef} 
              src={dayAssets.sound}
              preload="auto"
            />
            
            <VideoControls 
              isPlaying={isPlaying} 
              onPlayPause={handlePlayPause} 
              onFullscreen={handleFullscreen} 
              onShowIndex={() => setShowIndex(true)}
            />
          </>
        )}
        
        {showIframe && (
          <GameFrame 
            sessionId={sessionId} 
            studentId={studentId} 
            gameUrl="https://preview--confetti-square-celebration.lovable.app"
          />
        )}
        
        {showSecondIframe && (
          <GameFrame 
            sessionId={sessionId} 
            studentId={studentId} 
            gameUrl="https://preview--item-picker-fall.lovable.app"
          />
        )}
      </div>
    </div>
  );
};

export default VideoCanvas;
