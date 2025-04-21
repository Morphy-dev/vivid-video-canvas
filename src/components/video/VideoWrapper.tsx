
import React, { useEffect } from 'react';
import IntroFrameWrapper from './IntroFrameWrapper';
import VideoIndexWrapper from './VideoIndexWrapper';
import VideoContainerWrapper from './VideoContainerWrapper';
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
    INTRO_IMAGE_URL,
  } = useVideoWrapperController(props);

  // When intro finishes (showIntroFrame turns false), play video immediately if index is not shown
  useEffect(() => {
    if (!showIntroFrame && !showIndex && videoRef.current && !isPlaying) {
      videoRef.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showIntroFrame, showIndex]);

  if (showIntroFrame) {
    return (
      <IntroFrameWrapper
        showIntroFrame={showIntroFrame}
        setShowIntroFrame={setShowIntroFrame}
        dayAssets={dayAssets}
        INTRO_IMAGE_URL={INTRO_IMAGE_URL}
        className={className}
      />
    );
  }

  if (showIndex) {
    return (
      <VideoIndexWrapper
        showIndex={showIndex}
        setShowIndex={setShowIndex}
        availableVideos={availableVideos}
      />
    );
  }

  return (
    <VideoContainerWrapper
      className={className}
      sequence={sequence}
      isPlaying={isPlaying}
      handlePlayPause={handlePlayPause}
      handleFullscreen={handleFullscreen}
      setShowIndex={setShowIndex}
      preloadedSources={preloadedSources}
      preloadedRefs={preloadedRefs}
      videoRef={videoRef}
      dayAssets={dayAssets}
      sessionId={sessionId}
      studentId={studentId}
    />
  );
};

export default VideoWrapper;

