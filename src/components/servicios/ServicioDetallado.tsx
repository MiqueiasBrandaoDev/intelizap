
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, LucideIcon } from "lucide-react";

interface ServicioDetalladoProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  features: string[];
  reverse?: boolean;
}

const ServicioDetallado = ({ title, description, icon: Icon, path, features, reverse = false }: ServicioDetalladoProps) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 border-b border-zinc-700 pb-12`}>
      <div className="md:w-1/3 flex justify-center">
        <div className="w-24 h-24 bg-zinc-800 text-exertion-400 rounded-full flex items-center justify-center">
          <Icon size={48} />
        </div>
      </div>
      <div className="md:w-2/3">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-zinc-400 mb-4">{description}</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-zinc-300">
              <span className="text-exertion-500 mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to={path}
          className="inline-flex items-center text-exertion-400 font-medium hover:text-exertion-300"
        >
          Conocer más
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServicioDetallado;
