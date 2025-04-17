
import React, { useRef, useState, useEffect } from 'react';
import VideoControls from './VideoControls';

interface VideoCanvasProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  nextVideoSrc?: string;
}

const VideoCanvas: React.FC<VideoCanvasProps> = ({ 
  src, 
  className = '',
  autoPlay = false,
  nextVideoSrc
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play();
    }
  }, [autoPlay]);

  useEffect(() => {
    const handleEnded = () => {
      if (nextVideoSrc) {
        setCurrentSrc(nextVideoSrc);
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
  }, [nextVideoSrc]);

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
    <div className={`relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl ${className}`}>
      <video 
        ref={videoRef}
        src={currentSrc}
        className="w-full h-auto object-cover"
        onClick={handlePlayPause}
        autoPlay={autoPlay}
        preload="auto"
      />
      {nextVideoSrc && (
        <video 
          ref={nextVideoRef}
          src={nextVideoSrc}
          className="hidden"
          preload="auto"
        />
      )}
      <VideoControls 
        isPlaying={isPlaying} 
        onPlayPause={handlePlayPause}
        onFullscreen={handleFullscreen}
      />
    </div>
  );
};

export default VideoCanvas;
