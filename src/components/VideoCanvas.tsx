
import React, { useRef, useState, useEffect } from 'react';
import VideoControls from './VideoControls';
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
}

const VideoCanvas: React.FC<VideoCanvasProps> = ({
  src,
  className = '',
  autoPlay = false,
  nextVideoSrc,
  thirdVideoSrc,
  fourthVideoSrc,
  fifthVideoSrc,
  sixthVideoSrc
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const thirdVideoRef = useRef<HTMLVideoElement>(null);
  const fourthVideoRef = useRef<HTMLVideoElement>(null);
  const fifthVideoRef = useRef<HTMLVideoElement>(null);
  const sixthVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const dayAssets = getCurrentDayAssets();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = dayAssets.sound;
      audioRef.current.load();
    }
  }, [dayAssets.sound]);

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play();
    }
  }, [autoPlay]);

  useEffect(() => {
    const handleEnded = async () => {
      if (currentVideoIndex === 1 && nextVideoSrc) {
        setShowOverlay(true);
        
        if (audioRef.current) {
          try {
            console.log("Attempting to play audio:", dayAssets.sound);
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 1.0;
            await audioRef.current.play();
          } catch (error) {
            console.error("Audio playback error:", error);
          }
        }
        
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        setShowOverlay(false);
        setCurrentSrc(nextVideoSrc);
        setCurrentVideoIndex(2);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } 
      else if (currentVideoIndex === 2 && thirdVideoSrc) {
        setCurrentSrc(thirdVideoSrc);
        setCurrentVideoIndex(3);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } 
      else if (currentVideoIndex === 3 && fourthVideoSrc) {
        setCurrentSrc(fourthVideoSrc);
        setCurrentVideoIndex(4);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }
      else if (currentVideoIndex === 4 && fifthVideoSrc) {
        setCurrentSrc(fifthVideoSrc);
        setCurrentVideoIndex(5);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }
      else if (currentVideoIndex === 5 && sixthVideoSrc) {
        setCurrentSrc(sixthVideoSrc);
        setCurrentVideoIndex(6);
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
  }, [currentVideoIndex, nextVideoSrc, thirdVideoSrc, fourthVideoSrc, fifthVideoSrc, sixthVideoSrc, dayAssets.sound]);

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
        {fourthVideoSrc && <video ref={fourthVideoRef} src={fourthVideoSrc} className="hidden" preload="auto" />}
        {fifthVideoSrc && <video ref={fifthVideoRef} src={fifthVideoSrc} className="hidden" preload="auto" />}
        {sixthVideoSrc && <video ref={sixthVideoRef} src={sixthVideoSrc} className="hidden" preload="auto" />}
        
        {showOverlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <img 
              src={dayAssets.image}
              alt="Day of the week" 
              className="max-w-full max-h-full object-contain animate-fade-in" 
            />
          </div>
        )}
        
        <audio 
          ref={audioRef} 
          src={dayAssets.sound}
          preload="auto"
        />
        
        <VideoControls isPlaying={isPlaying} onPlayPause={handlePlayPause} onFullscreen={handleFullscreen} />
      </div>
    </div>
  );
};

export default VideoCanvas;
