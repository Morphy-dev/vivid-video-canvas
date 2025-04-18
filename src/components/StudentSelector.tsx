
import React from 'react';
import { Card } from "@/components/ui/card";

interface Student {
  id: string;
  nombre_completo: string;
  foto_url: string;
}

interface StudentSelectorProps {
  students: Student[];
  onStudentSelect: (student: Student) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({ students, onStudentSelect }) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Selecciona tu nombre</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {students.map((student) => (
          <Card
            key={student.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onStudentSelect(student)}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={student.foto_url || '/placeholder.svg'}
                  alt={student.nombre_completo}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center font-medium">{student.nombre_completo}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentSelector;
