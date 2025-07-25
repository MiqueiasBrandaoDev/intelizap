
import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedSuccessStory = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Historia de Éxito Destacada</h2>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-2/5">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                  alt="Empresa Industrias Patagónicas"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <div className="md:w-3/5 p-8">
                <div className="flex items-start mb-4">
                  <MessageSquare className="text-exertion-500 mr-4 mt-1" />
                  <blockquote className="italic text-gray-700 dark:text-gray-300">
                    "La implementación del sistema integral de gestión de Exertion Solutions nos permitió integrar todos nuestros departamentos en una única plataforma. Obtuvimos la certificación ISO 9001 en tiempo récord y logramos automatizar el 80% de nuestros procesos administrativos, lo que se tradujo en una mejora de productividad del 35% y un aumento en la satisfacción de nuestros clientes."
                  </blockquote>
                </div>
                
                <div className="mt-6">
                  <p className="font-bold text-lg">Alejandro Pereyra</p>
                  <p className="text-exertion-600 dark:text-exertion-400">Director de Operaciones, Industrias Patagónicas</p>
                  
                  <div className="mt-4 flex items-center">
                    <img 
                      src="https://placehold.co/200x80/e4e4e7/71717a?text=IND+PATAG&font=opensans" 
                      alt="Logo Industrias Patagónicas"
                      className="h-10 object-contain mr-4"
                    />
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link
                    to="/contacto" 
                    className="text-exertion-600 dark:text-exertion-400 font-medium hover:text-exertion-700 dark:hover:text-exertion-300 flex items-center"
                  >
                    <span>Quiero más info</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/contacto">
              <Button
                className="px-6 py-3 bg-exertion-600 hover:bg-exertion-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center"
              >
                <span>Compartir su experiencia</span>
                <MessageSquare size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSuccessStory;
