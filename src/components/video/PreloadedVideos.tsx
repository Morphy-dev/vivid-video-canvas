
import React from 'react';

interface PreloadedVideosProps {
  sources: (string | undefined)[];
  refs: React.RefObject<HTMLVideoElement>[];
}

const PreloadedVideos: React.FC<PreloadedVideosProps> = ({ sources, refs }) => {
  return (
    <>
      {sources.map((src, index) => 
        src && (
          <video 
            key={src} 
            ref={refs[index]} 
            src={src} 
            className="hidden" 
            preload="auto" 
          />
        )
      )}
    </>
  );
};

export default PreloadedVideos;
