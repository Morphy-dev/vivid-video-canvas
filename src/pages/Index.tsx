
import VideoCanvas from '../components/VideoCanvas';

const Index = () => {
  return (
    <div className="min-h-screen bg-soft-gray flex items-center justify-center p-8">
      <div className="w-full max-w-[90vw]">
        <VideoCanvas 
          src="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena01.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDEubXA0IiwiaWF0IjoxNzQ0OTE4MzkzLCJleHAiOjE3NDU1MjMxOTN9.08UzsY3CUHuhI9dW2RiRs1xPCRdnjLJXFv82Tsb-2ro" 
          nextVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena02.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDIubXA0IiwiaWF0IjoxNzQ0OTE4NTk2LCJleHAiOjE3NDU1MjMzOTZ9.TtRXC3A0YXvAMA_sNrKipvgFEiIc7YDtoWd6y1t-e28"
          thirdVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena%2003%20V3.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hIDAzIFYzLm1wNCIsImlhdCI6MTc0NDkxOTEyNywiZXhwIjoxNzQ1NTIzOTI3fQ.l50gIahSGXlXUG3d0T63jfIQfLWyTPIvDRFSPwiglAo"
          fourthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena04.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDQubXA0IiwiaWF0IjoxNzQ0OTMwOTMwLCJleHAiOjE3NDU1MzU3MzB9.2aEhK746x6wV8Pi7TpNVZMfI1gaiL4xtUGko737vis8"
          fifthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena%2005%20v3.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hIDA1IHYzLm1wNCIsImlhdCI6MTc0NDkzMTQxOCwiZXhwIjoxNzQ1NTM2MjE4fQ.dADQzHEJnnAzMeQJV0N97DAG7rzuNiwTzmKTdugaMo0"
          sixthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena%2006%20v3.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hIDA2IHYzLm1wNCIsImlhdCI6MTc0NDkzODIxMiwiZXhwIjoxNzQ1NTQzMDEyfQ.Z4t2GKCWlko5snQ-7Z_V1f_nf0E1IcIDgp8U3HKjqsU"
          className="animate-fade-in"
          autoPlay
        />
      </div>
    </div>
  );
};

export default Index;
