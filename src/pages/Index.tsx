
import VideoCanvas from '@/components/VideoCanvas';

const Index = () => {
  return (
    <div className="min-h-screen bg-soft-gray flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-dark-charcoal">
          Vivid Video Canvas
        </h1>
        <VideoCanvas 
          src="/placeholder-video.mp4" 
          className="animate-fade-in"
        />
      </div>
    </div>
  );
};

export default Index;
