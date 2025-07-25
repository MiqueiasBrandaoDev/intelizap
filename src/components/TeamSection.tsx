
import React from "react";
import { Linkedin } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const TeamSection = () => {
  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-800 relative overflow-hidden py-20">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-exertion-100 dark:bg-exertion-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gray-200 dark:bg-gray-700/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-exertion-100 dark:bg-exertion-900/30 text-exertion-600 dark:text-exertion-400 rounded-full text-sm font-medium mb-4">
            Nuestro Experto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conoce a Nuestro Experto</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Profesional con amplia experiencia dedicado a ofrecer soluciones innovadoras para los desafíos de tu empresa.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row">
            <div className="md:w-2/5 relative">
              <img 
                src="/lovable-uploads/3c271192-cba5-4905-b2d1-65a0246b8b50.png" 
                alt="Jorge Castro" 
                className="w-full h-80 md:h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:bg-gradient-to-l opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end md:items-center justify-center">
                <div className="p-6 w-full">
                  <div className="flex justify-center space-x-4">
                    <a 
                      href="https://www.linkedin.com/in/licjorgecastro" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                      aria-label="LinkedIn de Jorge Castro"
                    >
                      <Linkedin size={20} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 md:w-3/5 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2">Jorge Castro</h3>
              <p className="text-exertion-600 dark:text-exertion-400 text-lg font-medium mb-4">Fundador Exertion Solutions</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Con más de 15 años de experiencia en la gestión integral de calidad, salud, seguridad y medio ambiente, Jorge ha liderado la implementación de normas internacionales y sistemas integrados en el sector. Su compromiso con la excelencia y su capacidad para transformar procesos garantizan entornos laborales seguros y eficientes, posicionándolo como un referente en la industria.
              </p>
              <div className="mt-4">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-exertion-50 dark:bg-exertion-900/10 text-exertion-600 dark:text-exertion-400 text-sm rounded-full">Gestión de Calidad</span>
                  <span className="px-3 py-1 bg-exertion-50 dark:bg-exertion-900/10 text-exertion-600 dark:text-exertion-400 text-sm rounded-full">Salud y Seguridad</span>
                  <span className="px-3 py-1 bg-exertion-50 dark:bg-exertion-900/10 text-exertion-600 dark:text-exertion-400 text-sm rounded-full">Sistemas Integrados</span>
                  <span className="px-3 py-1 bg-exertion-50 dark:bg-exertion-900/10 text-exertion-600 dark:text-exertion-400 text-sm rounded-full">Transformación de Procesos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href="/sobre-nosotros" className="inline-flex items-center text-exertion-600 dark:text-exertion-400 font-medium hover:text-exertion-700 dark:hover:text-exertion-300 transition-colors">
            <span>Conoce más sobre nuestra empresa</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
