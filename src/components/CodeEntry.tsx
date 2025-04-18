
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CodeEntryProps {
  onGroupFound: (groupId: string) => void;
}

const CodeEntry: React.FC<CodeEntryProps> = ({ onGroupFound }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('grupos')
        .select('id')
        .eq('codigo', code)
        .single();

      if (error) throw error;
      if (data) {
        onGroupFound(data.id);
      } else {
        toast.error("Código no encontrado");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al buscar el código");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="code" className="text-lg font-medium">
            Ingresa el código de tu grupo
          </label>
          <Input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ingresa el código"
            className="w-full"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Buscando..." : "Continuar"}
        </Button>
      </form>
    </div>
  );
};

export default CodeEntry;
