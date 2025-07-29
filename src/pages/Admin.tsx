import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Users, Activity, BarChart3, Settings, Search, MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalGroups: number;
  totalResumos: number;
  resumosToday: number;
  planStats: Array<{ plano_ativo: boolean; total: number }>;
}

interface User {
  id: number;
  nome: string;
  email: string;
  instancia: string;
  plano_ativo: boolean;
  total_grupos: number;
  total_resumos: number;
  created_at: string;
}

interface SystemLog {
  id: number;
  status: string;
  data_envio: string;
  total_mensagens: number;
  usuario_nome: string;
  usuario_email: string;
  nome_grupo: string;
}

const Admin = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao carregar estatísticas');
      }

      const data = await response.json();
      setStats(data.data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar estatísticas do sistema',
        variant: 'destructive'
      });
    }
  };

  const fetchUsers = async (page = 1, search = '') => {
    try {
      const url = new URL('/api/admin/users', window.location.origin);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', '20');
      if (search) url.searchParams.append('search', search);

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao carregar usuários');
      }

      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar usuários',
        variant: 'destructive'
      });
    }
  };

  const fetchLogs = async (page = 1) => {
    try {
      const url = new URL('/api/admin/logs', window.location.origin);
      url.searchParams.append('page', page.toString());
      url.searchParams.append('limit', '50');

      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao carregar logs');
      }

      const data = await response.json();
      setLogs(data.data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao carregar logs do sistema',
        variant: 'destructive'
      });
    }
  };

  const toggleUserPlan = async (userId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/plan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ plano_ativo: !currentStatus })
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar plano do usuário');
      }

      toast({
        title: 'Sucesso',
        description: `Plano ${!currentStatus ? 'ativado' : 'desativado'} com sucesso`
      });

      // Refresh users list
      fetchUsers(currentPage, searchTerm);
      fetchAdminStats();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar plano do usuário',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchAdminStats(),
        fetchUsers(),
        fetchLogs()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchUsers(1, searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Carregando painel administrativo...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie o sistema e usuários</p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="logs">Logs do Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {stats && (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeUsers}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Grupos</CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalGroups}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resumos Hoje</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.resumosToday}</div>
                  <p className="text-xs text-muted-foreground">de {stats.totalResumos} total</p>
                </CardContent>
              </Card>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Planos</CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.planStats.map((plan) => (
                <div key={plan.plano_ativo.toString()} className="flex items-center justify-between py-2">
                  <span>{plan.plano_ativo ? 'Plano Ativo' : 'Plano Inativo'}</span>
                  <Badge variant={plan.plano_ativo ? 'default' : 'secondary'}>
                    {plan.total} usuários
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Usuários</CardTitle>
              <CardDescription>Lista de todos os usuários cadastrados no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-medium truncate">{user.nome}</span>
                        <Badge variant={user.plano_ativo ? 'default' : 'secondary'} className="w-fit">
                          {user.plano_ativo ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground break-words">
                        <div className="sm:hidden space-y-1">
                          <div>{user.email}</div>
                          <div>{user.total_grupos} grupos • {user.total_resumos} resumos</div>
                          <div className="text-xs">Cadastrado: {formatDate(user.created_at)}</div>
                        </div>
                        <div className="hidden sm:block">
                          {user.email} • {user.total_grupos} grupos • {user.total_resumos} resumos
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        Cadastrado em: {formatDate(user.created_at)}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 sm:h-10 sm:w-10">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => toggleUserPlan(user.id, user.plano_ativo)}
                          >
                            {user.plano_ativo ? 'Desativar Plano' : 'Ativar Plano'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>Atividade recente dos resumos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-medium truncate">{log.nome_grupo}</span>
                        <Badge variant={log.status === 'sucesso' ? 'default' : 'destructive'} className="w-fit">
                          {log.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground break-words">
                        <div className="sm:hidden space-y-1">
                          <div>{log.usuario_nome}</div>
                          <div className="text-xs">({log.usuario_email})</div>
                          <div className="text-xs">{log.total_mensagens} mensagens • {formatDate(log.data_envio)}</div>
                        </div>
                        <div className="hidden sm:block">
                          {log.usuario_nome} ({log.usuario_email})
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {log.total_mensagens} mensagens • {formatDate(log.data_envio)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;