import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

interface EvolutionGroup {
  nome_grupo: string;
  grupo_id_externo: string;
  participantes: number;
}

interface EvolutionGroupsContextType {
  evolutionGroups: EvolutionGroup[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  preloadGroups: (instanceName: string) => void;
}

const EvolutionGroupsContext = createContext<EvolutionGroupsContextType | undefined>(undefined);

export const useEvolutionGroupsContext = () => {
  const context = useContext(EvolutionGroupsContext);
  if (context === undefined) {
    throw new Error('useEvolutionGroupsContext must be used within an EvolutionGroupsProvider');
  }
  return context;
};

export const EvolutionGroupsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [shouldLoad, setShouldLoad] = useState(false);
  
  const instanceName = user?.nome || '';

  // Query para carregar grupos da Evolution API
  const {
    data: evolutionGroupsResponse,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['evolutionGroups', instanceName, user?.id],
    queryFn: () => 
      user && instanceName ? apiService.getEvolutionGroups(instanceName, user.id) : Promise.resolve(null),
    enabled: !!user?.id && !!instanceName && instanceName.trim() !== '' && (shouldLoad || isAuthenticated),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true, // Recarregar quando a página ganhar foco
    refetchOnMount: true, // Recarregar quando o componente for montado
  });

  // Função para pré-carregar grupos (chamada no login)
  const preloadGroups = (instanceName: string) => {
    if (instanceName && user?.id) {
      setShouldLoad(true);
      // Força o fetch imediatamente
      queryClient.invalidateQueries({ queryKey: ['evolutionGroups', instanceName, user.id] });
    }
  };

  // Carregar grupos automaticamente quando o usuário estiver autenticado
  useEffect(() => {
    if (isAuthenticated && user && instanceName) {
      setShouldLoad(true);
    }
  }, [isAuthenticated, user, instanceName]);

  // Escutar evento de login para começar carregamento imediatamente
  useEffect(() => {
    const handleUserLoggedIn = (event: CustomEvent) => {
      const { user: loggedUser } = event.detail;
      if (loggedUser?.nome) {
        console.log('🚀 Iniciando carregamento de grupos após login...');
        preloadGroups(loggedUser.nome);
      }
    };

    window.addEventListener('userLoggedIn', handleUserLoggedIn as EventListener);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn as EventListener);
    };
  }, [preloadGroups]);

  // Limpar cache quando o usuário fizer logout
  useEffect(() => {
    if (!isAuthenticated) {
      setShouldLoad(false);
      queryClient.removeQueries({ queryKey: ['evolutionGroups'] });
    }
  }, [isAuthenticated, queryClient]);

  const value = {
    evolutionGroups: evolutionGroupsResponse?.data || [],
    isLoading,
    error,
    refetch,
    preloadGroups,
  };

  return (
    <EvolutionGroupsContext.Provider value={value}>
      {children}
    </EvolutionGroupsContext.Provider>
  );
};