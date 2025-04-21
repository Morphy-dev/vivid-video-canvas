
import React from 'react';
import IntroFrame from './IntroFrame';

interface IntroFrameWrapperProps {
  showIntroFrame: boolean;
  setShowIntroFrame: (show: boolean) => void;
  dayAssets: { image: string; sound: string };
  INTRO_IMAGE_URL: string;
  className?: string;
}

const IntroFrameWrapper: React.FC<IntroFrameWrapperProps> = ({
  showIntroFrame,
  setShowIntroFrame,
  dayAssets,
  INTRO_IMAGE_URL,
  className = '',
}) => {
  if (!showIntroFrame) return null;

  return (
    <div className={`relative w-full max-w-6xl mx-auto ${className}`}>
      <IntroFrame
        show={true}
        onFinish={() => setShowIntroFrame(false)}
        dayImage={dayAssets.image}
        daySound={dayAssets.sound}
        backgroundUrl={INTRO_IMAGE_URL}
      />
    </div>
  );
};

export default IntroFrameWrapper;

