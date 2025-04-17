
import React, { useRef, useState } from 'react';
import VideoControls from './VideoControls';

interface VideoCanvasProps {
  src: string;
  className?: string;
}

const VideoCanvas: React.FC<VideoCanvasProps> = ({ 
  src, 
  className = '' 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
        src={src}
        className="w-full h-auto object-cover"
        onClick={handlePlayPause}
      />
      <VideoControls 
        isPlaying={isPlaying} 
        onPlayPause={handlePlayPause}
        onFullscreen={handleFullscreen}
      />
    </div>
  );
};

export default VideoCanvas;
