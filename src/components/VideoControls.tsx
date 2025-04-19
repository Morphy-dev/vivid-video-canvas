
import React from 'react';
import { Play, Pause, Maximize2, List } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onFullscreen: () => void;
  onShowIndex?: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ 
  isPlaying, 
  onPlayPause, 
  onFullscreen,
  onShowIndex
}) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 flex space-x-4">
      <button 
        onClick={onPlayPause} 
        className="text-white hover:scale-110 transition-transform"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <button 
        onClick={onFullscreen} 
        className="text-white hover:scale-110 transition-transform"
      >
        <Maximize2 size={24} />
      </button>
      {onShowIndex && (
        <button 
          onClick={onShowIndex} 
          className="text-white hover:scale-110 transition-transform"
        >
          <List size={24} />
        </button>
      )}
    </div>
  );
};

export default VideoControls;
