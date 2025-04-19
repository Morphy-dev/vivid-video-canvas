
import React, { useRef } from 'react';
import VideoControls from '../VideoControls';
import VideoOverlay from './VideoOverlay';
import PreloadedVideos from './PreloadedVideos';

interface VideoContainerProps {
  currentSrc: string;
  isPlaying: boolean;
  showOverlay: boolean;
  onPlayPause: () => void;
  onFullscreen: () => void;
  onShowIndex: () => void;
  preloadedSources: (string | undefined)[];
  preloadedRefs: React.RefObject<HTMLVideoElement>[];
  videoRef: React.RefObject<HTMLVideoElement>;
  overlayImageSrc: string;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
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
      
      <VideoOverlay show={showOverlay} imageSrc={overlayImageSrc} />
      
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
