
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchFormProps {
  isMobile?: boolean;
}

const SearchForm = ({ isMobile = false }: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Búsqueda Iniciada",
        description: `Buscando: "${searchQuery}"`,
        duration: 3000,
      });
      setSearchQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${isMobile ? 'px-3 py-2' : ''}`}>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={`
          ${isMobile ? 'w-full py-2' : 'pl-9 pr-4 py-1 w-32 focus:w-40'} 
          ${isMobile ? 'rounded-md' : 'rounded-full'} 
          text-sm bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-exertion-400 
          transition-all text-zinc-200
          ${isMobile ? 'pl-9' : 'pl-9'}
        `}
      />
      <Search 
        size={16} 
        className={`
          absolute 
          ${isMobile ? 'left-6' : 'left-3'} 
          top-1/2 transform -translate-y-1/2 text-zinc-400
        `} 
      />
    </form>
  );
};

export default SearchForm;
