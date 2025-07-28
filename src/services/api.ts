import { 
  Usuario, 
  Grupo, 
  Mensagem, 
  Resumo,
  ResumoWithGrupo,
  CreateUsuarioData, 
  CreateGrupoData, 
  CreateMensagemData, 
  CreateResumoData,
  UpdateUsuarioData,
  DashboardStats,
  RecentActivity,
  ApiResponse,
  PaginatedResponse,
  GrupoWithMensagens
} from '@/types/database';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '' : 'http://localhost:3001');

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('intellizapp_token');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, senha: string): Promise<ApiResponse<{ user: Usuario; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
  }

  async register(userData: CreateUsuarioData): Promise<ApiResponse<{ user: Usuario; token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Usuario endpoints
  async getUser(id: number): Promise<ApiResponse<Usuario>> {
    return this.request(`/usuarios/${id}`);
  }

  async updateUser(id: number, data: UpdateUsuarioData): Promise<ApiResponse<Usuario>> {
    return this.request(`/usuarios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(id: number, currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return this.request(`/usuarios/${id}/password`, {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async deleteUser(id: number): Promise<ApiResponse<void>> {
    return this.request(`/usuarios/${id}`, {
      method: 'DELETE',
    });
  }

  // Grupos endpoints
  async getGrupos(usuarioId: number, page: number = 1, limit: number = 50): Promise<PaginatedResponse<Grupo>> {
    return this.request(`/grupos?usuario_id=${usuarioId}&page=${page}&limit=${limit}`);
  }

  async getGrupo(id: number): Promise<ApiResponse<GrupoWithMensagens>> {
    return this.request(`/grupos/${id}`);
  }

  async createGrupo(data: CreateGrupoData): Promise<ApiResponse<Grupo>> {
    return this.request('/grupos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateGrupo(id: number, data: Partial<CreateGrupoData>): Promise<ApiResponse<Grupo>> {
    return this.request(`/grupos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGrupo(id: number): Promise<ApiResponse<void>> {
    return this.request(`/grupos/${id}`, {
      method: 'DELETE',
    });
  }

  // Mensagens endpoints
  async getMensagens(
    grupoId: number, 
    page: number = 1, 
    limit: number = 100
  ): Promise<PaginatedResponse<Mensagem>> {
    return this.request(`/mensagens?grupo_id=${grupoId}&page=${page}&limit=${limit}`);
  }

  async createMensagem(data: CreateMensagemData): Promise<ApiResponse<Mensagem>> {
    return this.request('/mensagens', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteMensagem(id: number): Promise<ApiResponse<void>> {
    return this.request(`/mensagens/${id}`, {
      method: 'DELETE',
    });
  }

  // Resumos endpoints
  async getResumos(
    usuarioId: number, 
    page: number = 1, 
    limit: number = 20,
    dataInicio?: string,
    dataFim?: string,
    grupoId?: number,
    status?: string
  ): Promise<PaginatedResponse<ResumoWithGrupo>> {
    let endpoint = `/resumos?usuario_id=${usuarioId}&page=${page}&limit=${limit}`;
    
    if (dataInicio) endpoint += `&data_inicio=${dataInicio}`;
    if (dataFim) endpoint += `&data_fim=${dataFim}`;
    if (grupoId) endpoint += `&grupo_id=${grupoId}`;
    if (status) endpoint += `&status=${status}`;
    
    return this.request(endpoint);
  }

  async createResumo(data: CreateResumoData): Promise<ApiResponse<Resumo>> {
    return this.request('/resumos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async gerarResumo(grupoId: number): Promise<ApiResponse<Resumo>> {
    return this.request('/api/resumos/gerar', {
      method: 'POST',
      body: JSON.stringify({ grupo_id: grupoId }),
    });
  }

  // Dashboard endpoints
  async getDashboardStats(usuarioId: number): Promise<ApiResponse<DashboardStats>> {
    return this.request(`/dashboard/stats?usuario_id=${usuarioId}`);
  }

  async getRecentActivity(usuarioId: number, limit: number = 5): Promise<ApiResponse<RecentActivity[]>> {
    return this.request(`/dashboard/activity?usuario_id=${usuarioId}&limit=${limit}`);
  }

  async getSystemInsights(usuarioId: number): Promise<ApiResponse<any>> {
    return this.request(`/dashboard/insights?usuario_id=${usuarioId}`);
  }

  // Evolution API endpoints
  async getEvolutionGroups(instanceName: string, userId: number): Promise<ApiResponse<any[]>> {
    return this.request(`/evolution/groups/${instanceName}?userId=${userId}`);
  }

  async getEvolutionStatus(instanceName: string): Promise<ApiResponse<any>> {
    return this.request(`/evolution/status/${instanceName}`);
  }

  async connectEvolution(instanceName: string, userId: number): Promise<ApiResponse<any>> {
    return this.request('/evolution/connect', {
      method: 'POST',
      body: JSON.stringify({ instanceName, userId }),
    });
  }

  async disconnectEvolution(instanceName: string): Promise<ApiResponse<any>> {
    return this.request(`/evolution/disconnect/${instanceName}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async health(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
export default apiService;