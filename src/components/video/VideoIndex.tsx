
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ListRestart } from 'lucide-react';

interface VideoIndexProps {
  videos: Array<{ index: number; label: string; src: string | undefined }>;
  onSelect: (index: number) => void;
  onFirstVideo: () => void;
}

const VideoIndex: React.FC<VideoIndexProps> = ({ videos, onSelect, onFirstVideo }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Video Navigation Index</h2>
        <p className="text-gray-600">Select a video to jump directly to that point in the sequence</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Button
            key={video.index}
            variant="outline"
            className="flex justify-between items-center p-4 h-auto"
            onClick={() => onSelect(video.index)}
          >
            <span>{video.label}</span>
            <ArrowRight size={16} />
          </Button>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          variant="default"
          onClick={onFirstVideo}
          className="flex items-center gap-2"
        >
          <ListRestart size={16} />
          <span>Start from the beginning</span>
        </Button>
      </div>
    </div>
  );
};

export default VideoIndex;
