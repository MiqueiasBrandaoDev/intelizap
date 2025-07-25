
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ChevronLeft } from "lucide-react";

interface CasoHeroProps {
  title: string;
  date: string;
  readTime: number;
  industry: string;
}

const CasoHero = ({ title, date, readTime, industry }: CasoHeroProps) => {
  return (
    <section className="bg-gradient-to-r from-zinc-800 to-zinc-700 py-14 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <Link 
            to="/casos-de-exito" 
            className="self-start inline-flex items-center text-white/90 hover:text-white mb-6"
          >
            <ChevronLeft size={16} className="mr-2" />
            Volver a Casos de Éxito
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className="inline-flex items-center text-white/80 text-sm">
                <Calendar size={16} className="mr-2" />
                {date}
              </span>
              <span className="inline-flex items-center text-white/80 text-sm">
                <Clock size={16} className="mr-2" />
                {readTime} min de lectura
              </span>
            </div>
            
            <div className="flex justify-center">
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">
                {industry}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasoHero;
