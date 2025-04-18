import React, { useRef, useState, useEffect } from 'react';
import VideoControls from './VideoControls';
import { getCurrentDayAssets } from '../utils/dayAssets';
import { supabase } from "@/integrations/supabase/client";

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
  const dayAssets = getCurrentDayAssets();

  const [sessionId] = useState(() => crypto.randomUUID());

  const recordProgress = async (videoSrc: string, completed: boolean = false) => {
    if (!studentId) return;

    try {
      const videoName = videoSrc.split('/').pop()?.split('?')[0] || 'unknown';
      
      const { error } = await supabase
        .from('student_progress')
        .insert({
          session_id: sessionId,
          student_id: studentId,
          activity: videoName,
          completed_at: completed ? new Date().toISOString() : null
        });

      if (error) {
        console.error('Error recording progress:', error);
      }
    } catch (error) {
      console.error('Error recording progress:', error);
    }
  };

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
  }, [currentVideoIndex, nextVideoSrc, thirdVideoSrc, fourthVideoSrc, fifthVideoSrc, sixthVideoSrc, dayAssets.sound, src]);

  useEffect(() => {
    // Record start of first video when component mounts
    if (studentId) {
      recordProgress(src);
    }
  }, [studentId, src]);

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
          </>
        ) : (
          <iframe
            src="https://preview--confetti-square-celebration.lovable.app/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="absolute inset-0"
            allow="autoplay; fullscreen; vr"
          />
        )}
      </div>
    </div>
  );
};

export default VideoCanvas;
