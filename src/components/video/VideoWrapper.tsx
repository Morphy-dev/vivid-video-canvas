
import React from 'react';
import VideoContainer from './VideoContainer';
import GameFrame from './GameFrame';
import IntroFrame from "./IntroFrame";
import VideoIndexFrame from "./VideoIndexFrame";
import { useVideoWrapperController } from '../../hooks/useVideoWrapperController';

const VideoWrapper = (props: any) => {
  const {
    showIntroFrame,
    setShowIntroFrame,
    showIndex,
    setShowIndex,
    isPlaying,
    className,
    videoRef,
    preloadedSources,
    preloadedRefs,
    availableVideos,
    dayAssets,
    handlePlayPause,
    handleFullscreen,
    handleIndexSelect,
    sequence,
    sessionId,
    studentId,
    INTRO_IMAGE_URL
  } = useVideoWrapperController(props);

  if (showIntroFrame && !showIndex) {
    return (
      <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
        <IntroFrame
          show={true}
          onFinish={() => setShowIntroFrame(false)}
          dayImage={dayAssets.image}
          daySound={dayAssets.sound}
          backgroundUrl={INTRO_IMAGE_URL}
        />
      </div>
    );
  }

  if (showIndex) {
    return (
      <VideoIndexFrame
        availableVideos={availableVideos}
        onSelect={handleIndexSelect}
        onFirstVideo={() => setShowIndex(false)}
      />
    );
  }

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
        {!sequence.showIframe && !sequence.showSecondIframe && (
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
      </div>
    </div>
  );
};

export default VideoWrapper;
