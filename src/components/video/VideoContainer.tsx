
import React from 'react';
import VideoControls from '../VideoControls';
import VideoOverlay from './VideoOverlay';
import PreloadedVideos from './PreloadedVideos';

const VideoContainer = ({
  currentSrc,
  isPlaying,
  showOverlay,
  onPlayPause,
  onFullscreen,
  onShowIndex,
  preloadedSources,
  preloadedRefs,
  videoRef,
  overlayImageSrc,
  showDayOverlay = false
}) => {
  return (
    <>
      <video 
        ref={videoRef} 
        src={currentSrc} 
        onClick={onPlayPause} 
        autoPlay={false} 
        preload="auto" 
        className="absolute inset-0 w-full h-full object-contain" 
      />
      <PreloadedVideos
        sources={preloadedSources}
        refs={preloadedRefs}
      />
      {showOverlay && <VideoOverlay show={true} imageSrc={overlayImageSrc} />}
      {/* The day overlay (`Today is...`) shown only via intro image now */}
      {/* {showDayOverlay && ...} */}
      <VideoControls 
        isPlaying={isPlaying} 
        onPlayPause={onPlayPause} 
        onFullscreen={onFullscreen}
        onShowIndex={onShowIndex}
      />
    </>
  );
};

export default VideoContainer;
