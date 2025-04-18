
import React from 'react';

interface VideoOverlayProps {
  show: boolean;
  imageSrc: string;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ show, imageSrc }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <img 
        src={imageSrc}
        alt="Day of the week" 
        className="max-w-full max-h-full object-contain animate-fade-in" 
      />
    </div>
  );
};

export default VideoOverlay;
