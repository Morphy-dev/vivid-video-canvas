
import VideoCanvas from '@/components/VideoCanvas';

const Index = () => {
  return (
    <div className="min-h-screen bg-soft-gray flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <VideoCanvas 
          src="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena01.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDEubXA0IiwiaWF0IjoxNzQ0OTE4MzkzLCJleHAiOjE3NDU1MjMxOTN9.08UzsY3CUHuhI9dW2RiRs1xPCRdnjLJXFv82Tsb-2ro" 
          nextVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena02.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDIubXA0IiwiaWF0IjoxNzQ0OTE4NTk2LCJleHAiOjE3NDU1MjMzOTZ9.TtRXC3A0YXvAMA_sNrKipvgFEiIc7YDtoWd6y1t-e28"
          className="animate-fade-in"
          autoPlay
        />
      </div>
    </div>
  );
};

export default Index;
