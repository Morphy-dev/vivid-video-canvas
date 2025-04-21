import React, { useEffect } from "react";
import IntroFrameWrapper from "./IntroFrameWrapper";
import VideoIndexWrapper from "./VideoIndexWrapper";
import VideoContainerWrapper from "./VideoContainerWrapper";
import { useVideoIntroSequence } from "../../hooks/useVideoIntroSequence";
import { useVideoWrapperController } from "../../hooks/useVideoWrapperController";

const VideoWrapper = (props: any) => {
  const {
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

  // This handles the logic: index → intro → video
  const {
    showIndex,
    showIntroFrame,
    handleIndexClose,
    handleIntroFinish,
  } = useVideoIntroSequence(true);

  // Play video (autoplay) when intro frame ends
  useEffect(() => {
    if (!showIntroFrame && !showIndex && videoRef.current && !isPlaying) {
      videoRef.current.play();
    }
    // eslint-disable-next-line
  }, [showIntroFrame, showIndex]);

  // Render index FIRST if needed
  if (showIndex) {
    return (
      <VideoIndexWrapper
        showIndex={showIndex}
        setShowIndex={() => handleIndexClose()} // when index is closed, show intro frame
        availableVideos={availableVideos}
      />
    );
  }

  // Render intro frame AFTER index (only once index is closed)
  if (showIntroFrame) {
    return (
      <IntroFrameWrapper
        showIntroFrame={showIntroFrame}
        setShowIntroFrame={handleIntroFinish} // when done, show video
        dayAssets={dayAssets}
        INTRO_IMAGE_URL={INTRO_IMAGE_URL}
        className={className}
      />
    );
  }

  // Otherwise, show main video container
  return (
    <VideoContainerWrapper
      className={className}
      sequence={sequence}
      isPlaying={isPlaying}
      handlePlayPause={handlePlayPause}
      handleFullscreen={handleFullscreen}
      setShowIndex={() => handleIndexClose()} // reuse for menu button: show menu → close intro
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
