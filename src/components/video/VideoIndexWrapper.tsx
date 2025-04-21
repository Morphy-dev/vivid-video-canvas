
import React from 'react';
import VideoIndexFrame from './VideoIndexFrame';

interface VideoIndexWrapperProps {
  showIndex: boolean;
  setShowIndex: (show: boolean) => void;
  availableVideos: Array<{ index: number; label: string; src: string }>;
}

const VideoIndexWrapper: React.FC<VideoIndexWrapperProps> = ({
  showIndex,
  setShowIndex,
  availableVideos,
}) => {
  if (!showIndex) return null;

  return (
    <VideoIndexFrame
      availableVideos={availableVideos}
      onSelect={(index) => {
        // The parent component handler is expected to handle setting showIndex false
      }}
      onFirstVideo={() => setShowIndex(false)}
    />
  );
};

export default VideoIndexWrapper;
