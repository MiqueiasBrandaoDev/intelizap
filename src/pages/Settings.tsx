import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Clock,
  Bot,
  Key,
  Volume2,
  Smartphone,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    instancia: user?.instancia || '',
    horaResumo: user?.horaResumo || '09:00',
    resumoDiaAnterior: Boolean(user?.resumoDiaAnterior),
    transcricao_ativa: Boolean(user?.transcricao_ativa),
    'transcricao-pvd': Boolean(user?.['transcricao-pvd']),
    transcreverEu: Boolean(user?.transcreverEu),
    ludico: Boolean(user?.ludico),
    agendamento: Boolean(user?.agendamento),
    ambiente: user?.ambiente || 'prod',
    'key-openai': user?.['key-openai'] || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Atualizar formData sempre que user mudar (dados frescos do banco)
  useEffect(() => {
    if (user) {
      console.log('🔄 Atualizando formData com dados frescos do usuário:', {
        'transcricao-pvd': user['transcricao-pvd'],
        ludico: user.ludico,
        agendamento: user.agendamento
      });
      
      setFormData({
        nome: user.nome || '',
        email: user.email || '',
        instancia: user.instancia || '',
        horaResumo: user.horaResumo || '09:00',
        resumoDiaAnterior: Boolean(user.resumoDiaAnterior),
        transcricao_ativa: Boolean(user.transcricao_ativa),
        'transcricao-pvd': Boolean(user['transcricao-pvd']),
        transcreverEu: Boolean(user.transcreverEu),
        ludico: Boolean(user.ludico),
        agendamento: Boolean(user.agendamento),
        ambiente: user.ambiente || 'prod',
        'key-openai': user['key-openai'] || ''
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateUser(formData);
      toast({
        title: "Perfil atualizado",
        description: "Suas configurações foram salvas com sucesso."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar as configurações."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha todos os campos de senha."
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "A nova senha e confirmação não coincidem."
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres."
      });
      return;
    }

    setLoading(true);
    try {
      await apiService.changePassword(user!.id, passwordData.currentPassword, passwordData.newPassword);
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível alterar a senha."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold cyber-text">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências e configurações da conta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome</Label>
                  <Input
                    disabled
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    className="cyber-border"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="cyber-border"
                    disabled
                  />
                </div>
              </div>
              
            </CardContent>
          </Card>

          {/* Resume Settings */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary" />
                Configurações de Resumo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Horário do Resumo - Interface Melhorada */}
              <div className="space-y-4 p-6 border border-secondary/20 rounded-lg bg-gradient-to-r from-secondary/5 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-secondary/10">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="horaResumo" className="text-lg font-semibold">
                      Horário do Resumo Automático
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Defina quando os resumos dos grupos serão enviados automaticamente todos os dias
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 ml-16">
                  <div className="space-y-2">
                    <Input
                      id="horaResumo"
                      type="time"
                      value={formData.horaResumo}
                      onChange={(e) => handleInputChange('horaResumo', e.target.value)}
                      className="cyber-border w-40 text-xl font-mono text-center"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="text-sm font-medium">Próximo envio</div>
                    <div className="text-lg font-semibold text-primary">
                      {(() => {
                        const now = new Date();
                        const [hours, minutes] = formData.horaResumo.split(':');
                        const resumeTime = new Date();
                        resumeTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                        
                        // Se já passou do horário hoje, mostrar amanhã
                        if (now > resumeTime) {
                          resumeTime.setDate(resumeTime.getDate() + 1);
                          return `Amanhã às ${formData.horaResumo}`;
                        } else {
                          return `Hoje às ${formData.horaResumo}`;
                        }
                      })()}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Resumos enviados diariamente no horário configurado
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Resumo do Dia Anterior</Label>
                    <p className="text-sm text-muted-foreground">
                      Incluir mensagens do dia anterior no resumo
                    </p>
                  </div>
                  <Switch
                    checked={formData.resumoDiaAnterior}
                    onCheckedChange={(checked) => handleInputChange('resumoDiaAnterior', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Lúdico</Label>
                    <p className="text-sm text-muted-foreground">
                      Adicionar humor e sarcasmo aos resumos
                    </p>
                  </div>
                  <Switch
                    checked={formData.ludico}
                    onCheckedChange={(checked) => handleInputChange('ludico', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transcription Settings */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-accent" />
                Configurações de Transcrição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Transcrição Ativa</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativar transcrição de áudios nos grupos
                  </p>
                </div>
                <Switch
                  checked={formData.transcricao_ativa}
                  onCheckedChange={(checked) => handleInputChange('transcricao_ativa', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Transcrição em Conversas Privadas</Label>
                  <p className="text-sm text-muted-foreground">
                    Incluir áudios de mensagens privadas
                  </p>
                </div>
                <Switch
                  checked={formData['transcricao-pvd']}
                  onCheckedChange={(checked) => handleInputChange('transcricao-pvd', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Transcrever Próprios Áudios</Label>
                  <p className="text-sm text-muted-foreground">
                    Incluir transcrição dos seus próprios áudios
                  </p>
                </div>
                <Switch
                  checked={formData.transcreverEu}
                  onCheckedChange={(checked) => handleInputChange('transcreverEu', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-destructive" />
                Alterar Senha
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className="cyber-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="cyber-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="cyber-border"
                />
              </div>
              
              <Button 
                onClick={handleChangePassword}
                disabled={loading}
                variant="destructive"
                className="w-full"
              >
                Alterar Senha
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Account Status Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-accent" />
                Status da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Plano</span>
                <Badge 
                  className={user?.plano_ativo 
                    ? "bg-green-500/20 text-green-400 border-green-500/30" 
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                  }
                >
                  {user?.plano_ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Criado em</span>
                <span className="text-sm text-muted-foreground">
                  {user?.criado_em ? new Date(user.criado_em).toLocaleDateString('pt-BR') : '-'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button 
            onClick={handleSaveProfile}
            disabled={loading}
            className="w-full cyber-button"
            size="lg"
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Salvando...' : 'Salvar Configurações'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;