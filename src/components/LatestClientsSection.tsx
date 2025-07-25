
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LatestClientsSection = () => {
  return (
    <section className="section-padding bg-zinc-900 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-zinc-800/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-zinc-800/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left column with text */}
          <div className="lg:w-7/12 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-zinc-800/80 text-zinc-300 rounded-full text-sm font-medium mb-4">
              Últimos Clientes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¡Impulsamos la Excelencia e Innovación en Logística Total SRL!
            </h2>
            <div className="space-y-4 text-zinc-300">
              <p className="leading-relaxed">
                En Exertion Solutions estamos entusiasmados de iniciar un ciclo transformador junto a Logística Total SRL, la distribuidora líder de la cervecería nacional más grande. A través de consultoría, capacitación y acompañamiento, estamos optimizando, digitalizando y automatizando su sistema de gestión empresarial, siguiendo los lineamientos S&H en seguridad, auditorías internas, gestión documental y cumplimiento normativo.
              </p>
              <p className="leading-relaxed font-medium text-zinc-100">
                ¡Esta alianza fortalece la eficiencia operativa, moderniza procesos y marca la diferencia en el crecimiento regional!
              </p>
              <p className="leading-relaxed">
                Si tu empresa busca mejorar, implementar o transformar su sistema de gestión empresarial, ¡únete a nosotros y eleva tus estándares de calidad!
              </p>
              <div className="pt-4">
                <Button 
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
                  size="lg"
                  asChild
                >
                  <a href="/contacto">
                    Contáctanos <ArrowRight className="ml-2" size={18} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right column with image */}
          <div className="lg:w-5/12 mt-8 lg:mt-0">
            <div className="relative bg-zinc-800 rounded-xl p-8 shadow-xl animate-float">
              <img 
                src="/lovable-uploads/3fc39dcf-8dc7-4477-8a7e-04ebb2a0c7b2.png" 
                alt="Logística Total SRL" 
                className="w-full h-auto max-w-md mx-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/80 via-transparent to-transparent rounded-xl opacity-30"></div>
              
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-zinc-100">Logística Total SRL</h3>
                <p className="text-zinc-400 text-sm">Distribución & Cargas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestClientsSection;
