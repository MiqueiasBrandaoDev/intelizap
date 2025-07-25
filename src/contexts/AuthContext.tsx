import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import { Usuario } from '@/types/database';

type User = Usuario;

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  instancia: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStoredAuth = async () => {
      // LIMPAR CACHE SEMPRE - DADOS FRESCOS DO BANCO
      console.log('🗑️ LIMPANDO CACHE LOCALSTORAGE');
      
      const storedToken = localStorage.getItem('intellizapp_token');
      let storedUserId = null;
      
      // Tentar pegar apenas o ID do usuário, ignorar resto dos dados
      try {
        const storedUser = localStorage.getItem('intellizapp_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          storedUserId = userData.id;
        }
      } catch (error) {
        console.log('Erro ao ler userData local, ignorando...');
      }
      
      if (storedToken && storedUserId) {
        try {
          console.log('🔄 BUSCANDO DADOS FRESCOS DO BANCO - ID:', storedUserId);
          
          // SEMPRE buscar dados frescos do servidor
          const response = await apiService.getUser(storedUserId);
          
          if (response.success && response.data) {
            console.log('✅ DADOS DO BANCO CARREGADOS:', {
              transcricao_ativa: response.data.transcricao_ativa,
              'transcricao-pvd': response.data['transcricao-pvd'],
              transcreverEu: response.data.transcreverEu,
              ludico: response.data.ludico,
              agendamento: response.data.agendamento
            });
            
            // Usar dados frescos do banco
            setUser(response.data);
            localStorage.setItem('intellizapp_user', JSON.stringify(response.data));
          } else {
            // Backend retornou erro, limpar tudo
            console.error('❌ Backend retornou erro, limpando sessão');
            localStorage.removeItem('intellizapp_user');
            localStorage.removeItem('intellizapp_token');
            setUser(null);
          }
        } catch (error) {
          // Backend não está funcionando - limpar tudo
          console.error('❌ Backend não funcional, limpando sessão:', error);
          localStorage.removeItem('intellizapp_user');
          localStorage.removeItem('intellizapp_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkStoredAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiService.login(email, password);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        localStorage.setItem('intellizapp_user', JSON.stringify(response.data.user));
        localStorage.setItem('intellizapp_token', response.data.token);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setLoading(true);
    try {
      const response = await apiService.register(userData);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        localStorage.setItem('intellizapp_user', JSON.stringify(response.data.user));
        localStorage.setItem('intellizapp_token', response.data.token);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('intellizapp_user');
    localStorage.removeItem('intellizapp_token');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      const response = await apiService.updateUser(user.id, userData);
      
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem('intellizapp_user', JSON.stringify(response.data));
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};