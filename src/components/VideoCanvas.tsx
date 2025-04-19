
import React from 'react';
import VideoWrapper from './video/VideoWrapper';

interface VideoCanvasProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  nextVideoSrc?: string;
  thirdVideoSrc?: string;
  fourthVideoSrc?: string;
  fifthVideoSrc?: string;
  sixthVideoSrc?: string;
  seventhVideoSrc?: string;
  eighthVideoSrc?: string;
  ninthVideoSrc?: string;
  tenthVideoSrc?: string;
  eleventhVideoSrc?: string;
  twelfthVideoSrc?: string;
  thirteenthVideoSrc?: string;
  studentId?: string;
}

const VideoCanvas: React.FC<VideoCanvasProps> = (props) => {
  return <VideoWrapper {...props} />;
};

export default VideoCanvas;
