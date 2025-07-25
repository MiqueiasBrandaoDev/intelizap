import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardStats, useRecentActivity, useSystemInsights } from '@/hooks/useDashboard';
import { useGrupos } from '@/hooks/useGrupos';
import { 
  Users, 
  FileText, 
  Clock, 
  Activity,
  Bot,
  Zap,
  TrendingUp,
  BarChart3,
  AlertCircle,
  Target,
  MessageSquare,
  BookOpen
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Fetch real data from API
  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: recentActivity, isLoading: activityLoading } = useRecentActivity(4);
  const { data: insights, isLoading: insightsLoading } = useSystemInsights();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold cyber-text">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta, {user?.nome}! Aqui está um resumo da sua conta.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cyber-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Grupos</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : statsError ? (
              <div className="text-2xl font-bold text-destructive">--</div>
            ) : (
              <div className="text-2xl font-bold">{stats?.totalGroups || 0}</div>
            )}
            <p className="text-xs text-muted-foreground">
              Total de grupos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grupos Ativos</CardTitle>
            <Activity className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : statsError ? (
              <div className="text-2xl font-bold text-destructive">--</div>
            ) : (
              <div className="text-2xl font-bold">{stats?.activeGroups || 0}</div>
            )}
            <p className="text-xs text-muted-foreground">
              {stats?.totalGroups && stats?.activeGroups
                ? `${((stats.activeGroups / stats.totalGroups) * 100).toFixed(0)}% do total`
                : 'Grupos ativos'
              }
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resumos Enviados</CardTitle>
            <FileText className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : statsError ? (
              <div className="text-2xl font-bold text-destructive">--</div>
            ) : (
              <div className="text-2xl font-bold">{stats?.totalResumes || 0}</div>
            )}
            <p className="text-xs text-muted-foreground">
              {stats?.resumosHoje ? `+${stats.resumosHoje} hoje` : 'Total de resumos'}
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Processadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : statsError ? (
              <div className="text-2xl font-bold text-destructive">--</div>
            ) : (
              <div className="text-2xl font-bold">{stats?.messagesProcessed || 0}</div>
            )}
            <p className="text-xs text-muted-foreground">
              {stats?.mensagensHoje ? `+${stats.mensagensHoje} hoje` : 'Total de mensagens'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Atividade Recente
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activityLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-2 h-2 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
            ) : !recentActivity?.length ? (
              <div className="text-center py-4">
                <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nenhuma atividade recente
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id || index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <div>
                        <p className="text-sm font-medium">{activity.grupo_nome}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.data_envio).toLocaleString('pt-BR')}
                          {activity.total_mensagens && ` • ${activity.total_mensagens} mensagens`}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        activity.status === 'enviado' 
                          ? 'default' 
                          : activity.status === 'erro' 
                            ? 'destructive' 
                            : 'secondary'
                      }
                      className="text-xs"
                    >
                      {activity.status === 'enviado' ? 'Enviado' : 
                       activity.status === 'erro' ? 'Erro' : 'Pendente'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Insights */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              Insights do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            {insightsLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Skeleton className="w-6 h-6 rounded" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Score de Produtividade</p>
                      <p className="text-xs text-muted-foreground">
                        Baseado na relação resumos/grupos
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={insights?.productivityScore >= 70 ? 'default' : insights?.productivityScore >= 40 ? 'secondary' : 'destructive'}
                    className="text-xs font-semibold"
                  >
                    {insights?.productivityScore || 0}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Grupo Mais Ativo</p>
                      <p className="text-xs text-muted-foreground">
                        {insights?.mostActiveGroupMessages || 0} mensagens
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-right">
                    <div className="font-medium">{insights?.mostActiveGroup}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">Média Diária</p>
                      <p className="text-xs text-muted-foreground">
                        Últimos 7 dias
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {insights?.avgMessagesPerDay || 0} msg/dia
                  </Badge>
                </div>

                {insights?.lastResumeTime && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Último Resumo</p>
                        <p className="text-xs text-muted-foreground">
                          {insights?.lastResumeGroup}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(insights.lastResumeTime).toLocaleString('pt-BR')}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Account Status */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-accent" />
            Status da Conta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className={`
                w-3 h-3 rounded-full 
                ${user?.plano_ativo ? 'bg-green-500' : 'bg-red-500'}
              `} />
              <div>
                <p className="text-sm font-medium">Plano</p>
                <p className="text-xs text-muted-foreground">
                  {user?.plano_ativo ? 'Ativo' : 'Inativo'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Zap className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Instância</p>
                <p className="text-xs text-muted-foreground">
                  {user?.instancia}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-secondary" />
              <div>
                <p className="text-sm font-medium">Próximo Resumo</p>
                <p className="text-xs text-muted-foreground">
                  {user?.horaResumo}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;