import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export const useEvolutionGroups = (instanceName?: string) => {
  const { user } = useAuth();

  const {
    data: evolutionGroupsResponse,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['evolutionGroups', instanceName, user?.id],
    queryFn: () => 
      user && instanceName ? apiService.getEvolutionGroups(instanceName, user.id) : Promise.resolve(null),
    enabled: !!user?.id && !!instanceName && instanceName.trim() !== '',
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    evolutionGroups: evolutionGroupsResponse?.data || [],
    isLoading,
    error,
    refetch,
  };
};