import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export const useDashboardStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['dashboardStats', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      const response = await apiService.getDashboardStats(user.id);
      if (!response.success) throw new Error(response.message || 'Failed to fetch stats');
      return response.data;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRecentActivity = (limit: number = 5) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['recentActivity', user?.id, limit],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      const response = await apiService.getRecentActivity(user.id, limit);
      if (!response.success) throw new Error(response.message || 'Failed to fetch activity');
      return response.data;
    },
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // 2 minutes
  });
};

export const useSystemInsights = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['systemInsights', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      const response = await apiService.getSystemInsights(user.id);
      if (!response.success) throw new Error(response.message || 'Failed to fetch insights');
      return response.data;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });
};