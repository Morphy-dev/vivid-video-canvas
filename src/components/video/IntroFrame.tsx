
import React, { useEffect, useRef } from "react";

interface IntroFrameProps {
  show: boolean;
  onFinish: () => void;
  dayImage: string;
  daySound: string;
  backgroundUrl: string;
}

const IntroFrame: React.FC<IntroFrameProps> = ({
  show,
  onFinish,
  dayImage,
  daySound,
  backgroundUrl,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (show) {
      // Play day audio as soon as frame is visible
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1.0;
        audioRef.current.play().catch(() => {});
      }
      // After 4 seconds, finish
      timeout = setTimeout(() => {
        onFinish();
      }, 4000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [show, onFinish]);

  if (!show) return null;

  return (
    <div className="relative w-full flex flex-col items-center justify-center" style={{ aspectRatio: "16/9" }}>
      {/* Background image/scene */}
      <img
        className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-xl"
        src={backgroundUrl}
        alt="Intro"
        style={{ zIndex: 1 }}
      />
      {/* Day-of-week image and label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 2 }}>
        <img
          src={dayImage}
          alt="Day"
          className="h-[38vh] w-auto object-contain drop-shadow-lg rounded-md"
        />
        <p className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl text-white animate-fade-in">
          Today is...
        </p>
      </div>
      <audio ref={audioRef} src={daySound} preload="auto" />
    </div>
  );
};

export default IntroFrame;
