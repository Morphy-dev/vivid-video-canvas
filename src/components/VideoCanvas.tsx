import React, { useRef, useState, useEffect } from 'react';
import VideoControls from './VideoControls';

interface VideoCanvasProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  nextVideoSrc?: string;
  thirdVideoSrc?: string;
}

const VideoCanvas: React.FC<VideoCanvasProps> = ({ 
  src, 
  className = '',
  autoPlay = false,
  nextVideoSrc,
  thirdVideoSrc
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const thirdVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isSecondVideo, setIsSecondVideo] = useState(false);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play();
    }
  }, [autoPlay]);

  useEffect(() => {
    const handleEnded = () => {
      if (!isSecondVideo && nextVideoSrc) {
        setCurrentSrc(nextVideoSrc);
        setIsSecondVideo(true);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (isSecondVideo && thirdVideoSrc) {
        setCurrentSrc(thirdVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
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
  }, [nextVideoSrc, thirdVideoSrc, isSecondVideo]);

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
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      <div className="relative w-full aspect-video">
        {/* Main video */}
        <video 
          ref={videoRef}
          src={currentSrc}
          className="absolute inset-0 w-full h-full object-cover"
          onClick={handlePlayPause}
          autoPlay={autoPlay}
          preload="auto"
        />
        
        {/* Preload next videos */}
        {nextVideoSrc && (
          <video 
            ref={nextVideoRef}
            src={nextVideoSrc}
            className="hidden"
            preload="auto"
          />
        )}
        {thirdVideoSrc && (
          <video 
            ref={thirdVideoRef}
            src={thirdVideoSrc}
            className="hidden"
            preload="auto"
          />
        )}
        
        {/* Frame overlay */}
        <img 
          src="/lovable-uploads/7eb4c391-0a60-485b-8489-d1e842d5e45a.png"
          alt="Video frame"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />
        
        <VideoControls 
          isPlaying={isPlaying} 
          onPlayPause={handlePlayPause}
          onFullscreen={handleFullscreen}
        />
      </div>
    </div>
  );
};

export default VideoCanvas;
