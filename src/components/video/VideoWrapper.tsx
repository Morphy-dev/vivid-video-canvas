
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

  // This handles the logic: intro → video (default, without index)
  const {
    showIndex,
    showIntroFrame,
    handleIndexClose,
    handleIntroFinish,
    setShowIndex
  } = useVideoIntroSequence(false); // Changed to false to skip index initially

  // Play video (autoplay) when intro frame ends
  useEffect(() => {
    if (!showIntroFrame && !showIndex && videoRef.current && !isPlaying) {
      videoRef.current.play();
    }
    // eslint-disable-next-line
  }, [showIntroFrame, showIndex]);

  // Render index if selected through controls
  if (showIndex) {
    return (
      <VideoIndexWrapper
        showIndex={showIndex}
        setShowIndex={() => handleIndexClose()} // when index is closed, show intro frame
        availableVideos={availableVideos}
      />
    );
  }

  // Render intro frame first (default view now)
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
      setShowIndex={() => setShowIndex(true)} // Changed to set showIndex to true when menu button is clicked
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
