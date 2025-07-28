import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { useResumos } from '@/hooks/useResumos';
import { useGrupos } from '@/hooks/useGrupos';
import { 
  FileText, 
  Search, 
  Filter,
  Calendar,
  Clock,
  Users,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Resumos = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch real data from API
  const { 
    resumos, 
    pagination,
    isLoading: resumosLoading,
    error: resumosError 
  } = useResumos(
    currentPage, 
    itemsPerPage, 
    undefined, 
    undefined,
    selectedGroup !== 'all' ? parseInt(selectedGroup) : undefined,
    selectedStatus !== 'all' ? selectedStatus : undefined
  );
  
  const { data: gruposData } = useGrupos(1, 100);

  // resumos já vem do hook useResumos
  const totalPages = pagination?.totalPages || 1;

  // Get groups for filter dropdown
  const groups = gruposData?.data || [];

  // Client-side filtering for search (server-side filtering handled by API)
  const filteredResumos = (resumos || []).filter(resumo => {
    if (!searchTerm) return true;
    return resumo.grupo?.nome_grupo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           resumo.conteudo?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'enviado':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Enviado</Badge>;
      case 'erro':
        return <Badge variant="destructive">Erro</Badge>;
      case 'pendente':
        return <Badge variant="secondary">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getTimeSince = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    return `${Math.floor(diffInHours / 24)}d atrás`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold cyber-text">Histórico de Resumos</h1>
        <p className="text-muted-foreground">
          Visualize todos os resumos enviados para seus grupos
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar resumos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 cyber-border"
          />
        </div>
        
        <Select value={selectedGroup} onValueChange={setSelectedGroup}>
          <SelectTrigger className="w-full sm:w-48 cyber-border">
            <SelectValue placeholder="Filtrar por grupo" />
          </SelectTrigger>
          <SelectContent className="cyber-card">
            <SelectItem value="all">Todos os grupos</SelectItem>
            {groups.map(group => (
              <SelectItem key={group.id} value={group.id.toString()}>
                {group.nome_grupo || 'Grupo sem nome'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-40 cyber-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="cyber-card">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="enviado">Enviado</SelectItem>
            <SelectItem value="erro">Erro</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredResumos.length} resumo{filteredResumos.length !== 1 ? 's' : ''} encontrado{filteredResumos.length !== 1 ? 's' : ''}
      </div>

      {/* Resumos Grid */}
      {resumosLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="cyber-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-3 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : resumosError ? (
        <Card className="cyber-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold mb-2">Erro ao carregar resumos</h3>
            <p className="text-muted-foreground text-center">
              Não foi possível carregar os resumos. Tente recarregar a página.
            </p>
          </CardContent>
        </Card>
      ) : !filteredResumos.length ? (
        <Card className="cyber-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum resumo encontrado</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm || selectedGroup !== 'all' || selectedStatus !== 'all'
                ? 'Tente ajustar os filtros de busca.'
                : 'Os resumos enviados aparecerão aqui.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResumos.map((resumo) => (
          <Card key={resumo.id} className="cyber-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    {resumo.grupo?.nome_grupo}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {getTimeSince(resumo.data_envio?.toString() || resumo.data_criacao.toString())}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {resumo.total_mensagens} msgs
                    </span>
                  </div>
                </div>
                {getStatusBadge(resumo.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-3 max-h-32 overflow-hidden relative">
                <p className="text-sm leading-relaxed">
                  {resumo.conteudo.substring(0, 200)}...
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted/30 to-transparent" />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {formatDate(resumo.data_envio?.toString() || resumo.data_criacao.toString())}
                </span>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] cyber-card">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-primary" />
                          {resumo.grupo?.nome_grupo}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(resumo.data_envio?.toString() || resumo.data_criacao.toString())}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {resumo.total_mensagens} mensagens
                          </span>
                          {getStatusBadge(resumo.status)}
                        </div>
                        <div className="bg-muted/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                          <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                            {resumo.conteudo}
                          </pre>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {/* Pagination */}
      {!resumosLoading && !resumosError && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Página {currentPage} de {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Resumos;