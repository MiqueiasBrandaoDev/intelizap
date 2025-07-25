import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Bot,
  Menu,
  X,
  Smartphone,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const DashboardLayout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirecionar usuários sem plano ativo para página Meu Plano
  useEffect(() => {
    if (user && user.plano_ativo !== 1 && location.pathname !== '/dashboard/meu-plano') {
      navigate('/dashboard/meu-plano', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, requiresActivePlan: true },
    { name: 'Grupos', href: '/dashboard/grupos', icon: Users, requiresActivePlan: true },
    { name: 'Resumos', href: '/dashboard/resumos', icon: FileText, requiresActivePlan: true },
    { name: 'Conexão', href: '/dashboard/conexao', icon: Smartphone, requiresActivePlan: true },
    { name: 'Configurações', href: '/dashboard/settings', icon: Settings, requiresActivePlan: true },
    { name: 'Meu Plano', href: '/dashboard/meu-plano', icon: Crown, requiresActivePlan: false },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card cyber-border transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold cyber-text">Intellizapp.IA</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation
              .filter(item => !item.requiresActivePlan || user?.plano_ativo === 1)
              .map((item) => {
                const Icon = item.icon;
                const isActive = isActiveRoute(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
          </nav>

          {/* User info and logout */}
          <div className="border-t border-border p-4">
            <div className="mb-4">
              <p className="text-sm font-medium text-foreground">{user?.nome}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
              <div className="mt-2 flex items-center">
                <div className={`
                  w-2 h-2 rounded-full mr-2
                  ${user?.plano_ativo ? 'bg-green-500' : 'bg-red-500'}
                `} />
                <span className="text-xs text-muted-foreground">
                  {user?.plano_ativo ? 'Plano Ativo' : 'Plano Inativo'}
                </span>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Instância: <span className="text-foreground font-medium">{user?.instancia}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;