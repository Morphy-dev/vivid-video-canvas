
import React from 'react';
import VideoIndex from './VideoIndex';

interface VideoIndexFrameProps {
  availableVideos: Array<{ index: number; label: string; src: string }>;
  onSelect: (index: number) => void;
  onFirstVideo: () => void;
}

const VideoIndexFrame: React.FC<VideoIndexFrameProps> = ({ availableVideos, onSelect, onFirstVideo }) => (
  <VideoIndex 
    videos={availableVideos}
    onSelect={onSelect}
    onFirstVideo={onFirstVideo}
  />
);

export default VideoIndexFrame;
