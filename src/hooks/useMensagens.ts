import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { Mensagem, CreateMensagemData } from '@/types/database';

export const useMensagens = (grupoId: number, page: number = 1, limit: number = 100) => {
  const queryClient = useQueryClient();

  const {
    data: mensagensResponse,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['mensagens', grupoId, page, limit],
    queryFn: () => apiService.getMensagens(grupoId, page, limit),
    enabled: !!grupoId,
  });

  const createMensagemMutation = useMutation({
    mutationFn: (data: CreateMensagemData) => apiService.createMensagem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensagens', grupoId] });
    },
  });

  const deleteMensagemMutation = useMutation({
    mutationFn: (id: number) => apiService.deleteMensagem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mensagens', grupoId] });
    },
  });

  return {
    mensagens: mensagensResponse?.data || [],
    pagination: mensagensResponse?.pagination,
    isLoading,
    error,
    refetch,
    createMensagem: createMensagemMutation.mutate,
    deleteMensagem: deleteMensagemMutation.mutate,
    isCreating: createMensagemMutation.isPending,
    isDeleting: deleteMensagemMutation.isPending,
  };
};