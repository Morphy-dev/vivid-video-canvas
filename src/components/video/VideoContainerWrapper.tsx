
import React from 'react';
import VideoContainer from './VideoContainer';
import GameFrame from './GameFrame';

interface VideoContainerWrapperProps {
  className?: string;
  sequence: {
    currentSrc: string;
    currentVideoIndex: number;
    showIframe: boolean;
    showSecondIframe: boolean;
    showThirdIframe: boolean;
    showOverlay: boolean;
  };
  isPlaying: boolean;
  handlePlayPause: () => void;
  handleFullscreen: () => void;
  setShowIndex: (show: boolean) => void;
  preloadedSources: Array<string | undefined>;
  preloadedRefs: Array<React.RefObject<HTMLVideoElement>>;
  videoRef: React.RefObject<HTMLVideoElement>;
  dayAssets: { image: string };
  sessionId: string;
  studentId?: string;
}

const VideoContainerWrapper: React.FC<VideoContainerWrapperProps> = ({
  className = '',
  sequence,
  isPlaying,
  handlePlayPause,
  handleFullscreen,
  setShowIndex,
  preloadedSources,
  preloadedRefs,
  videoRef,
  dayAssets,
  sessionId,
  studentId,
}) => {
  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        {!sequence.showIframe && !sequence.showSecondIframe && !sequence.showThirdIframe && (
          <VideoContainer
            currentSrc={sequence.currentSrc}
            isPlaying={isPlaying}
            showOverlay={
              // Only show overlay for days after video 1
              sequence.currentVideoIndex !== 1 && sequence.showOverlay
            }
            onPlayPause={handlePlayPause}
            onFullscreen={handleFullscreen}
            onShowIndex={() => setShowIndex(true)}
            preloadedSources={preloadedSources}
            preloadedRefs={preloadedRefs}
            videoRef={videoRef}
            overlayImageSrc={dayAssets.image}
            showDayOverlay={false}
          />
        )}
        {sequence.showIframe && (
          <GameFrame
            sessionId={sessionId}
            studentId={studentId}
            gameUrl="https://preview--confetti-square-celebration.lovable.app"
          />
        )}
        {sequence.showSecondIframe && (
          <GameFrame
            sessionId={sessionId}
            studentId={studentId}
            gameUrl="https://preview--item-picker-fall.lovable.app"
          />
        )}
        {sequence.showThirdIframe && (
          <GameFrame
            sessionId={sessionId}
            studentId={studentId}
            gameUrl="https://preview--sunny-day-selector.lovable.app/"
          />
        )}
      </div>
    </div>
  );
};

export default VideoContainerWrapper;
