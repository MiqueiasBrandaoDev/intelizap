
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  className?: string;
}

const ThemeToggle = ({ isDarkMode, toggleDarkMode, className = "" }: ThemeToggleProps) => {
  const { toast } = useToast();

  const handleToggle = () => {
    toggleDarkMode();
    
    toast({
      title: isDarkMode ? "Modo Claro Activado" : "Modo Oscuro Activado",
      description: isDarkMode ? "Interfaz cambiada a modo claro." : "Interfaz cambiada a modo oscuro.",
      duration: 2000,
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-200 ${className}`}
      aria-label="Cambiar modo oscuro"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
