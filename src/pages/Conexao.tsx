import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Smartphone, 
  QrCode, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  RefreshCw,
  Wifi,
  WifiOff,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConnectionStatus {
  connected: boolean;
  instanceName: string | null;
  qrCode: string | null;
  loading: boolean;
  error: string | null;
}

const Conexao = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    instanceName: null,
    qrCode: null,
    loading: true,
    error: null
  });
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Load user instance from database on component mount
  useEffect(() => {
    if (user?.nome) {
      setStatus(prev => ({
        ...prev,
        instanceName: user.nome, // Usando o nome do usuário como nome da instância
        loading: true // Mantém loading enquanto verifica status
      }));
      // Check initial connection status
      checkConnectionStatus(user.nome);
    }
  }, [user]);

  // Timer management
  useEffect(() => {
    if (status.qrCode && !status.connected && !timerInterval) {
      setTimer(30);
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setStatus(prev => ({
              ...prev,
              qrCode: null,
              error: 'QR Code expirado. Gere um novo código.'
            }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimerInterval(interval);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    };
  }, [status.qrCode, status.connected, timerInterval]);

  const generateQRCode = async () => {
    if (!status.instanceName) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Instância do usuário não encontrada."
      });
      return;
    }

    setStatus(prev => ({ ...prev, loading: true, error: null, qrCode: null }));

    try {
      // Conectar WhatsApp usando instância do usuário
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/evolution/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('intellizapp_token')}`
        },
        body: JSON.stringify({ 
          instanceName: status.instanceName,
          userId: user?.id 
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao conectar com a API');
      }

      const data = await response.json();

      // Check if already connected
      if (data.instance && data.instance.state === 'open') {
        setStatus(prev => ({
          ...prev,
          connected: true,
          qrCode: null,
          loading: false,
          error: null
        }));
        
        toast({
          title: "WhatsApp já conectado!",
          description: "Sua instância já está ativa e conectada."
        });
        return;
      }

      // If QR code is provided
      if (data.qrCode || data.base64) {
        const qrCodeData = data.base64 || data.qrCode;
        setStatus(prev => ({
          ...prev,
          connected: false,
          qrCode: qrCodeData.startsWith('data:') ? qrCodeData : `data:image/png;base64,${qrCodeData}`,
          loading: false,
          error: null
        }));
        
        toast({
          title: "QR Code gerado!",
          description: "Escaneie o código com seu WhatsApp."
        });
      }

    } catch (error) {
      console.error('WhatsApp connection error:', error);
      setStatus(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erro ao conectar com WhatsApp'
      }));

      toast({
        variant: "destructive",
        title: "Erro na conexão",
        description: error.message || "Não foi possível conectar com WhatsApp."
      });
    }
  };

  const checkConnectionStatus = async (instanceName?: string) => {
    const instance = instanceName || status.instanceName;
    if (!instance) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/evolution/status/${instance}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('intellizapp_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('📱 Status response:', data);
        
        if (data.connected || data.state === 'open') {
          setStatus(prev => ({
            ...prev,
            connected: true,
            qrCode: null,
            error: null,
            loading: false
          }));
          
          if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
          }
          
          toast({
            title: "WhatsApp conectado!",
            description: "Sua instância já está ativa e conectada."
          });
        } else {
          setStatus(prev => ({
            ...prev,
            connected: false,
            loading: false
          }));
        }
      } else {
        setStatus(prev => ({
          ...prev,
          connected: false,
          loading: false,
          error: 'Erro ao verificar status da instância'
        }));
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      setStatus(prev => ({
        ...prev,
        connected: false,
        loading: false,
        error: 'Erro ao verificar status da conexão'
      }));
    }
  };

  const disconnectWhatsApp = async () => {
    if (!status.instanceName) return;

    try {
      setStatus(prev => ({ ...prev, loading: true }));

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/evolution/disconnect/${status.instanceName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('intellizapp_token')}`
        }
      });

      if (response.ok) {
        setStatus({
          connected: false,
          instanceName: null,
          qrCode: null,
          loading: false,
          error: null
        });

        toast({
          title: "WhatsApp desconectado",
          description: "Sua instância foi desconectada com sucesso."
        });
      }
    } catch (error) {
      setStatus(prev => ({ ...prev, loading: false }));
      toast({
        variant: "destructive",
        title: "Erro ao desconectar",
        description: "Não foi possível desconectar o WhatsApp."
      });
    }
  };

  // Auto-check connection status when QR is displayed
  useEffect(() => {
    if (status.qrCode && !status.connected) {
      const statusCheckInterval = setInterval(checkConnectionStatus, 3000);
      return () => clearInterval(statusCheckInterval);
    }
  }, [status.qrCode, status.connected, status.instanceName]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold cyber-text">Conexão WhatsApp</h1>
        <p className="text-muted-foreground">
          Conecte sua conta WhatsApp para começar a usar o sistema
        </p>
      </div>

      {/* Main Connection Card */}
      <Card className="cyber-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-primary" />
            Status da Conexão
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              {status.loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              ) : status.connected ? (
                <Wifi className="h-5 w-5 text-green-500" />
              ) : (
                <WifiOff className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">
                  {status.loading ? 'Verificando conexão...' : status.connected ? 'Conectado' : 'Desconectado'}
                </p>
                {status.instanceName && (
                  <p className="text-sm text-muted-foreground">
                    Instância: {status.instanceName}
                  </p>
                )}
              </div>
            </div>
            <Badge 
              variant={status.loading ? "secondary" : status.connected ? "default" : "secondary"}
              className={status.connected && !status.loading ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}
            >
              {status.loading ? 'Verificando...' : status.connected ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>

          {!status.connected && !status.loading && status.instanceName && (
            <>
              {/* Instance Info Display */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <span className="font-medium">Sua Instância</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {status.instanceName}
                </p>
              </div>

              {/* Generate QR Button */}
              <Button
                onClick={generateQRCode}
                disabled={status.loading}
                className="w-full cyber-button"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Gerar QR Code
              </Button>
            </>
          )}

          {/* Loading state when instance not loaded yet */}
          {status.loading && !status.instanceName && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Carregando informações da instância...</p>
            </div>
          )}

          {/* QR Code Display */}
          {status.qrCode && !status.connected && (
            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg inline-block">
                <img 
                  src={status.qrCode} 
                  alt="QR Code WhatsApp" 
                  className="w-64 h-64 mx-auto"
                  style={{ 
                    filter: 'hue-rotate(240deg) saturate(0) contrast(3) brightness(1.2)'
                  }}
                />
              </div>
              
              {/* Timer */}
              {timer > 0 && (
                <div className="flex items-center justify-center gap-2">
                  <Clock className="h-4 w-4 text-black" />
                  <span className="text-sm font-medium text-amber-600">
                    Expira em {timer}s
                  </span>
                </div>
              )}

              {/* Instructions */}
              <div className="bg-muted/30 rounded-lg p-4 text-left space-y-3">
                <h4 className="font-medium">Como conectar:</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">1</span>
                    Abra o WhatsApp no seu celular
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">2</span>
                    Vá em Configurações → Aparelhos conectados
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">3</span>
                    Toque em "Conectar um aparelho"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">4</span>
                    Escaneie este QR Code
                  </li>
                </ol>
              </div>

              <Button
                variant="outline"
                onClick={generateQRCode}
                disabled={status.loading}
                className="mt-4"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Gerar Novo QR Code
              </Button>
            </div>
          )}

          {/* Connected Status */}
          {status.connected && (
            <div className="text-center space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-green-400 mb-2">
                  WhatsApp Conectado!
                </h3>
                <p className="text-sm text-green-300 mb-4">
                  Sua instância está conectada e pronta para uso
                </p>
                <div className="text-xs text-green-300 space-y-1">
                  <p>✓ Pronto para enviar mensagens</p>
                  <p>✓ Integração ativa</p>
                  <p>✓ Recebendo mensagens</p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={disconnectWhatsApp}
                disabled={status.loading}
                className="text-destructive hover:text-destructive"
              >
                {status.loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <WifiOff className="mr-2 h-4 w-4" />
                )}
                Desconectar WhatsApp
              </Button>
            </div>
          )}

          {/* Error Display */}
          {status.error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Erro</span>
              </div>
              <p className="text-sm text-red-300 mt-1">{status.error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-lg">Integração Inteligente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Nossa tecnologia se conecta diretamente com o WhatsApp para máxima eficiência.
            </p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>• Conexão direta e confiável</p>
              <p>• Processamento em tempo real</p>
              <p>• Automação inteligente</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-lg">Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Suas mensagens são processadas de forma segura e privada.
            </p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>• Conexão criptografada</p>
              <p>• Dados não são armazenados</p>
              <p>• Conformidade com LGPD</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Conexao;