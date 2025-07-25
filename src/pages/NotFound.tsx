
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: El usuario intentó acceder a una ruta inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageLayout>
      <div className="section-main flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <div className="relative mb-8">
            <div className="text-9xl font-bold text-zinc-800">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl md:text-3xl font-bold text-zinc-200">Página No Encontrada</div>
            </div>
          </div>
          
          <p className="text-lg text-zinc-400 mb-8">
            No pudimos encontrar la página que estás buscando. Puede que haya sido movida, eliminada o nunca haya existido.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/" className="w-full sm:w-auto px-6 py-3 bg-exertion-600 hover:bg-exertion-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center">
              <Home size={18} className="mr-2" />
              <span>Volver al Inicio</span>
            </Link>
            <button onClick={() => window.history.back()} className="w-full sm:w-auto px-6 py-3 bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium rounded-lg hover:bg-zinc-700 transition-colors flex items-center justify-center">
              <ArrowLeft size={18} className="mr-2" />
              <span>Regresar</span>
            </button>
          </div>
          
          <div className="mt-12">
            <p className="text-zinc-400 mb-4">Intenta buscar lo que estás buscando:</p>
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-base bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-exertion-400 text-zinc-200"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;
