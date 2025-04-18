
import React, { useRef, useState, useEffect } from 'react';
import VideoControls from './VideoControls';
import VideoOverlay from './video/VideoOverlay';
import PreloadedVideos from './video/PreloadedVideos';
import GameFrame from './video/GameFrame';
import useVideoProgress from '../hooks/useVideoProgress';
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
  studentId
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
  const [showIframe, setShowIframe] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  
  const dayAssets = getCurrentDayAssets();
  const { recordProgress } = useVideoProgress(studentId, sessionId);

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
        await recordProgress(src, true);
        setShowOverlay(true);
        
        if (audioRef.current) {
          try {
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
        await recordProgress(nextVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 2 && thirdVideoSrc) {
        await recordProgress(nextVideoSrc!, true);
        setCurrentSrc(thirdVideoSrc);
        setCurrentVideoIndex(3);
        await recordProgress(thirdVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 3 && fourthVideoSrc) {
        await recordProgress(thirdVideoSrc!, true);
        setCurrentSrc(fourthVideoSrc);
        setCurrentVideoIndex(4);
        await recordProgress(fourthVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 4 && fifthVideoSrc) {
        await recordProgress(fourthVideoSrc!, true);
        setCurrentSrc(fifthVideoSrc);
        setCurrentVideoIndex(5);
        await recordProgress(fifthVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 5 && sixthVideoSrc) {
        await recordProgress(fifthVideoSrc!, true);
        setCurrentSrc(sixthVideoSrc);
        setCurrentVideoIndex(6);
        await recordProgress(sixthVideoSrc);
        if (videoRef.current) {
          videoRef.current.play();
        }
      } else if (currentVideoIndex === 6) {
        await recordProgress(sixthVideoSrc!, true);
        setShowIframe(true);
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
  }, [currentVideoIndex, nextVideoSrc, thirdVideoSrc, fourthVideoSrc, fifthVideoSrc, sixthVideoSrc, dayAssets.sound, src, recordProgress]);

  useEffect(() => {
    if (studentId) {
      recordProgress(src);
    }
  }, [studentId, src, recordProgress]);

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
        {!showIframe ? (
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
              sources={[nextVideoSrc, thirdVideoSrc, fourthVideoSrc, fifthVideoSrc, sixthVideoSrc]}
              refs={[nextVideoRef, thirdVideoRef, fourthVideoRef, fifthVideoRef, sixthVideoRef]}
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
        ) : (
          <GameFrame sessionId={sessionId} studentId={studentId} />
        )}
      </div>
    </div>
  );
};

export default VideoCanvas;
