
import React, { useRef, useState } from 'react';
import VideoControls from './VideoControls';
import VideoOverlay from './video/VideoOverlay';
import PreloadedVideos from './video/PreloadedVideos';
import GameFrame from './video/GameFrame';
import { useVideoSequence } from '../hooks/useVideoSequence';
import { getCurrentDayAssets } from '../utils/dayAssets';

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
  
  const dayAssets = getCurrentDayAssets();

  const { currentSrc, showOverlay, showIframe, showSecondIframe } = useVideoSequence({
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

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        {!showIframe && !showSecondIframe ? (
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
            />
          </>
        ) : showIframe ? (
          <GameFrame 
            sessionId={sessionId} 
            studentId={studentId} 
            gameUrl="https://preview--confetti-square-celebration.lovable.app"
          />
        ) : (
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
