
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Dashboard from "@/pages/Dashboard";
import Grupos from "@/pages/Grupos";
import Resumos from "@/pages/Resumos";
import Settings from "@/pages/Settings";
import Conexao from "@/pages/Conexao";
import MeuPlano from "@/pages/MeuPlano";

const queryClient = new QueryClient();

// ScrollToTop component to handle smooth scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return null;
};

// Apply dark mode by default
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark');
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={
                <ProtectedRoute requiresActivePlan={true}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="grupos" element={
                <ProtectedRoute requiresActivePlan={true}>
                  <Grupos />
                </ProtectedRoute>
              } />
              <Route path="resumos" element={
                <ProtectedRoute requiresActivePlan={true}>
                  <Resumos />
                </ProtectedRoute>
              } />
              <Route path="conexao" element={
                <ProtectedRoute requiresActivePlan={true}>
                  <Conexao />
                </ProtectedRoute>
              } />
              <Route path="settings" element={
                <ProtectedRoute requiresActivePlan={true}>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="meu-plano" element={<MeuPlano />} />
            </Route>
            
            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
