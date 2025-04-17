import React, { useRef, useState, useEffect } from 'react';
import VideoControls from './VideoControls';
import { getCurrentDayAssets } from '../utils/dayAssets';

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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isSecondVideo, setIsSecondVideo] = useState(false);
  const [showDayImage, setShowDayImage] = useState(false);
  const dayAssets = getCurrentDayAssets();

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play();
    }
  }, [autoPlay]);

  useEffect(() => {
    const handleEnded = async () => {
      if (!isSecondVideo && nextVideoSrc) {
        setShowDayImage(true);
        
        if (audioRef.current) {
          try {
            audioRef.current.currentTime = 0;
            await audioRef.current.play();
          } catch (error) {
            console.error("Audio playback error:", error);
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        setShowDayImage(false);
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
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <video 
          ref={videoRef} 
          src={currentSrc} 
          onClick={handlePlayPause} 
          autoPlay={autoPlay} 
          preload="auto" 
          className="absolute inset-0 w-full h-full object-contain" 
        />
        
        {nextVideoSrc && <video ref={nextVideoRef} src={nextVideoSrc} className="hidden" preload="auto" />}
        {thirdVideoSrc && <video ref={thirdVideoRef} src={thirdVideoSrc} className="hidden" preload="auto" />}
        
        {showDayImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <img 
              src={dayAssets.image} 
              alt="Day specific" 
              className="max-w-full max-h-full object-contain animate-fade-in" 
            />
          </div>
        )}
        
        <audio 
          ref={audioRef} 
          src={dayAssets.sound} 
          preload="auto" 
          className="hidden"
        />
        
        <VideoControls isPlaying={isPlaying} onPlayPause={handlePlayPause} onFullscreen={handleFullscreen} />
      </div>
    </div>
  );
};

export default VideoCanvas;
