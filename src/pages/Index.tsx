
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import VideoCanvas from '../components/VideoCanvas';
import CodeEntry from '../components/CodeEntry';
import StudentSelector from '../components/StudentSelector';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Student {
  id: string;
  nombre_completo: string;
  foto_url: string;
  grupo_id: string;
}

interface School {
  nombre: string;
}

const Index = () => {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [schoolName, setSchoolName] = useState<string>('');

  const handleGroupFound = async (foundGroupId: string) => {
    try {
      // Fetch students for the group
      const { data: studentsData, error: studentsError } = await supabase
        .from('estudiantes')
        .select('id, nombre_completo, foto_url, grupo_id')
        .eq('grupo_id', foundGroupId)
        .eq('status', true);

      // Fetch school name
      const { data: groupData, error: groupError } = await supabase
        .from('grupos')
        .select('instituciones(nombre)')
        .eq('id', foundGroupId)
        .single();

      if (studentsError) throw studentsError;
      if (groupError) throw groupError;

      setStudents(studentsData || []);
      setSchoolName(groupData?.instituciones?.nombre || 'Escuela no encontrada');
      setGroupId(foundGroupId);
    } catch (error) {
      console.error('Error fetching students or school:', error);
    }
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
  };

  if (!groupId) {
    return (
      <div className="min-h-screen bg-soft-gray flex items-center justify-center p-8">
        <CodeEntry onGroupFound={handleGroupFound} />
      </div>
    );
  }

  if (!selectedStudent) {
    return (
      <div className="min-h-screen bg-soft-gray flex items-center justify-center p-8">
        <StudentSelector students={students} onStudentSelect={handleStudentSelect} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-gray relative flex items-center justify-center p-8">
      {/* Student and School Info in Top Right Corner */}
      <div className="absolute top-4 right-4 text-right z-10">
        <div className="flex items-center justify-end space-x-2">
          <Avatar className="w-12 h-12">
            <AvatarImage 
              src={selectedStudent.foto_url || '/placeholder.svg'} 
              alt={selectedStudent.nombre_completo} 
            />
            <AvatarFallback>{selectedStudent.nombre_completo.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{selectedStudent.nombre_completo}</p>
            <p className="text-xs text-gray-500">{schoolName}</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[90vw]">
        <VideoCanvas 
          src="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena01.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDEubXA0IiwiaWF0IjoxNzQ0OTE4MzkzLCJleHAiOjE3NDU1MjMxOTN9.08UzsY3CUHuhI9dW2RiRs1xPCRdnjLJXFv82Tsb-2ro" 
          nextVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena02.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzBkNjQ4NTJjLTUwN2ItNGZkOC05YTA4LTNlNDU5NjZkYWRjMiJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDIubXA0IiwiaWF0IjoxNzQ1MjQ1ODgyLCJleHAiOjE3NDU4NTA2ODJ9.kviiQztU8XyzMvSoZuClJ-EomwYWV66COKfajbzaus0"
          thirdVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena%2003%20V3.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hIDAzIFYzLm1wNCIsImlhdCI6MTc0NDkxOTEyNywiZXhwIjoxNzQ1NTIzOTI3fQ.l50gIahSGXlXUG3d0T63jfIQfLWyTPIvDRFSPwiglAo"
          fourthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena04.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDQubXA0IiwiaWF0IjoxNzQ0OTMwOTMwLCJleHAiOjE3NDU1MzU3MzB9.2aEhK746x6wV8Pi7TpNVZMfI1gaiL4xtUGko737vis8"
          fifthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena%2005%20v3.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hIDA1IHYzLm1wNCIsImlhdCI6MTc0NDkzMTQxOCwiZXhwIjoxNzQ1NTM2MjE4fQ.dADQzHEJnnAzMeQJV0N97DAG7rzuNiwTzmKTdugaMo0"
          sixthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena%2006%20V4.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzBkNjQ4NTJjLTUwN2ItNGZkOC05YTA4LTNlNDU5NjZkYWRjMiJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hIDA2IFY0Lm1wNCIsImlhdCI6MTc0NTI1Nzc5NiwiZXhwIjoxNzQ1ODYyNTk2fQ.FeQwdoHgFiyNh9MgI7IBfdcU8CmeuK9hM0duyg3U25s"
          seventhVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena07.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzBkNjQ4NTJjLTUwN2ItNGZkOC05YTA4LTNlNDU5NjZkYWRjMiJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDcubXA0IiwiaWF0IjoxNzQ1MDg5Mzc0LCJleHAiOjE3NDU2OTQxNzR9.j1vIQlVwNRrqGoOdhoNzYuf0Ej31gnMDGR6lRGPQBr8"
          eighthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena08.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzBkNjQ4NTJjLTUwN2ItNGZkOC05YTA4LTNlNDU5NjZkYWRjMiJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMDgubXA0IiwiaWF0IjoxNzQ1MDg5Mzg5LCJleHAiOjE3NDU2OTQxODl9.Nu3u2cKatVVDEQyhkH9xjjjl02re3BIgrMIKyqHqdlA"
          ninthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena%2009.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzBkNjQ4NTJjLTUwN2ItNGZkOC05YTA4LTNlNDU5NjZkYWRjMiJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hIDA5Lm1wNCIsImlhdCI6MTc0NTA4OTQwMCwiZXhwIjoxNzQ1Njk0MjAwfQ.vrtn7SweYuZETWIBgXNNSsxwyUYhVO7Pp-Bbb6Fldj0"
          tenthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena10.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzBkNjQ4NTJjLTUwN2ItNGZkOC05YTA4LTNlNDU5NjZkYWRjMiJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMTAubXA0IiwiaWF0IjoxNzQ1MDg5NDExLCJleHAiOjE3NDU2OTQyMTF9.LVxsv8IsKiLv7thSEX6Fg6VrZid7t2TZqRd0Rksgcbc"
          eleventhVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena11.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzBkNjQ4NTJjLTUwN2ItNGZkOC05YTA4LTNlNDU5NjZkYWRjMiJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMTEubXA0IiwiaWF0IjoxNzQ1MDg5NDIwLCJleHAiOjE3NDU2OTQyMjB9.HggdAYM97SICfQ5WPPLyUgfTROikJ2Qs6RKOUY7o7tQ"
          twelfthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena12.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzBkNjQ4NTJjLTUwN2ItNGZkOC05YTA4LTNlNDU5NjZkYWRjMiJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMTIubXA0IiwiaWF0IjoxNzQ1MDg5NDI5LCJleHAiOjE3NDc2ODE0Mjl9.bc77K68E6vExkB5oBY4pT8HZqRjlP5QYkrCGX2pDMV4"
          thirteenthVideoSrc="https://ksnyoasamhyunakuqdst.supabase.co/storage/v1/object/sign/videos/Semana01_Escena13.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzBkNjQ4NTJjLTUwN2ItNGZkOC05YTA4LTNlNDU5NjZkYWRjMiJ9.eyJ1cmwiOiJ2aWRlb3MvU2VtYW5hMDFfRXNjZW5hMTMubXA0IiwiaWF0IjoxNzQ1MDg5NDUzLCJleHAiOjE3NDU2OTQyNTN9.J4jRHcZ23c_kbi2dXwv_Yvs0jVjmKohM_l9eFYrUh5k"
          className="animate-fade-in"
          autoPlay
          studentId={selectedStudent?.id}
        />
      </div>
    </div>
  );
};

export default Index;
