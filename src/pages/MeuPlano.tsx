import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Crown, 
  Check, 
  Users, 
  MessageSquare,
  Bot,
  Zap,
  Calendar,
  ExternalLink,
  AlertTriangle,
  Coins,
  RefreshCw
} from 'lucide-react';

const MeuPlano = () => {
  const { user } = useAuth();
  const planoAtivo = user?.plano_ativo === 1;

  const handlePagamento = () => {
    window.open('https://payment.ticto.app/O58A018E0', '_blank');
  };

  // Calcular IntelliCoins baseado nos grupos (cada grupo = 105 coins)
  const maxGrupos = user?.max_grupos || 0;
  const totalCoins = maxGrupos * 105; // 105 coins por grupo
  const intelliCoinsDisponiveis = Math.floor((user?.tokens_mes || 0) / 1000);
  const coinsPercentage = totalCoins > 0 ? (intelliCoinsDisponiveis / totalCoins) * 100 : 0;

  // Calcular próxima renovação
  const getRenovacaoDate = () => {
    const diaRenovacao = user?.['dia-renovacao-tokens'];
    if (!diaRenovacao) return null;
    
    const hoje = new Date();
    let proximaRenovacao = new Date(hoje.getFullYear(), hoje.getMonth(), diaRenovacao);
    
    // Se já passou do dia da renovação neste mês, vai para o próximo mês
    if (proximaRenovacao <= hoje) {
      proximaRenovacao = new Date(hoje.getFullYear(), hoje.getMonth() + 1, diaRenovacao);
    }
    
    return proximaRenovacao;
  };

  const proximaRenovacao = getRenovacaoDate();
  const diasRestantes = proximaRenovacao 
    ? Math.ceil((proximaRenovacao.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold cyber-text flex items-center gap-2">
          <Crown className="h-8 w-8 text-primary" />
          Meu Plano
        </h1>
        <p className="text-muted-foreground">
          Gerencie sua assinatura e acesse recursos premium
        </p>
      </div>

      {/* IntelliCoins */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-6 w-6 text-yellow-500" />
            IntelliCoins Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold cyber-text text-yellow-500">
                {intelliCoinsDisponiveis.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                de {totalCoins.toLocaleString()} coins totais
              </p>
            </div>
            <Badge 
              variant={coinsPercentage > 20 ? "secondary" : "destructive"}
              className="text-sm px-3 py-1"
            >
              {coinsPercentage.toFixed(0)}%
            </Badge>
          </div>

          <Progress 
            value={coinsPercentage} 
            className="h-3"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-lg font-semibold">
                {totalCoins.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total de Coins</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-lg font-semibold">
                {diasRestantes}
              </div>
              <p className="text-xs text-muted-foreground">Dias p/ Renovação</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-lg font-semibold">
                {proximaRenovacao?.getDate() || '--'}
              </div>
              <p className="text-xs text-muted-foreground">Próxima Renovação</p>
            </div>
          </div>

          {coinsPercentage < 20 && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2 text-amber-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium text-sm">IntelliCoins baixos</span>
              </div>
              <p className="text-xs text-amber-300 mt-1">
                Considere fazer upgrade para continuar gerando resumos sem interrupções.
              </p>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center">
            💡 <strong>Cada grupo recebe 105 IntelliCoins</strong> • Usado para gerar resumos com IA
          </div>
        </CardContent>
      </Card>

      {/* Status do Plano */}
      <Card className="cyber-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Status da Assinatura</CardTitle>
            <Badge 
              variant={planoAtivo ? "default" : "secondary"}
              className={planoAtivo ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}
            >
              {planoAtivo ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {planoAtivo ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-400">Plano Premium Ativo</span>
              </div>
              <p className="text-sm text-green-300">
                Você tem acesso completo a todos os recursos da plataforma.
              </p>
            </div>
          ) : (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-medium text-red-400">Plano Inativo</span>
              </div>
              <p className="text-sm text-red-300">
                Ative seu plano para acessar todos os recursos da plataforma.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium">{user?.max_grupos || 0}</p>
              <p className="text-sm text-muted-foreground">Grupos WhatsApp</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Coins className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="font-medium">{totalCoins}</p>
              <p className="text-sm text-muted-foreground">IntelliCoins Totais</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium">IA Premium</p>
              <p className="text-sm text-muted-foreground">Resumos</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium">Automação</p>
              <p className="text-sm text-muted-foreground">Completa</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plano Premium */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Crown className="h-6 w-6 text-primary" />
            Plano Premium
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preço */}
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold cyber-text">R$ 197</div>
            <p className="text-muted-foreground">Pagamento único</p>
          </div>

          {/* Recursos */}
          <div className="space-y-3">
            <h4 className="font-medium">O que está incluído:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Até {user?.max_grupos || 3} grupos WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{totalCoins} IntelliCoins ({maxGrupos} × 105)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Resumos automáticos com IA</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Agendamento personalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Dashboard analítico completo</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Suporte prioritário</span>
              </div>
            </div>
          </div>

          {/* Botão de Ação */}
          {!planoAtivo && (
            <Button 
              onClick={handlePagamento}
              className="w-full cyber-button text-lg py-6"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Ativar Plano Premium
            </Button>
          )}

          {planoAtivo && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="font-medium text-green-400">Plano já ativo!</p>
              <p className="text-sm text-green-300">Aproveite todos os recursos premium.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* FAQ/Ajuda */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="text-lg">Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Como funciona o pagamento?</h4>
            <p className="text-sm text-muted-foreground">
              O pagamento é processado de forma segura através da plataforma Ticto. 
              Após a confirmação, seu plano será ativado automaticamente.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Posso cancelar a qualquer momento?</h4>
            <p className="text-sm text-muted-foreground">
              Sim, você pode cancelar sua assinatura a qualquer momento. 
              Entre em contato com nosso suporte para assistência.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Como funcionam os IntelliCoins?</h4>
            <p className="text-sm text-muted-foreground">
              Cada grupo recebe 105 IntelliCoins para gerar resumos inteligentes. 
              Os coins são renovados automaticamente todo mês no dia {user?.['dia-renovacao-tokens'] || 'definido'}.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Como funciona o limite de grupos?</h4>
            <p className="text-sm text-muted-foreground">
              Com o plano premium, você pode conectar até {user?.max_grupos || 3} grupos WhatsApp 
              para receber resumos automáticos e análises.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeuPlano;