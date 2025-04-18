
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useVideoProgress = (studentId?: string, sessionId?: string) => {
  const recordProgress = useCallback(async (videoSrc: string, completed: boolean = false) => {
    if (!studentId) return;

    try {
      const videoName = videoSrc.split('/').pop()?.split('?')[0] || 'unknown';
      
      const { error } = await supabase
        .from('student_progress')
        .insert({
          session_id: sessionId,
          student_id: studentId,
          activity: videoName,
          completed_at: completed ? new Date().toISOString() : null
        });

      if (error) {
        console.error('Error recording progress:', error);
      }
    } catch (error) {
      console.error('Error recording progress:', error);
    }
  }, [studentId, sessionId]);

  return { recordProgress };
};

export default useVideoProgress;
