import React, { useState, useEffect, useRef } from "react";
import { 
  Users, 
  Briefcase, 
  MapPin, 
  Clock, 
  Server, 
  Star, 
  Shield,
  FileText 
} from "lucide-react";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
  duration?: number;
  isVisible?: boolean;
}

const Stat: React.FC<StatProps> = ({ 
  value, 
  suffix = "", 
  label, 
  icon: Icon, 
  duration = 2000,
  isVisible = false
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (isVisible) {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
      
      const stepValue = Math.ceil(value / (duration / 20));
      
      counterRef.current = setInterval(() => {
        setDisplayValue(prev => {
          const newValue = prev + stepValue;
          if (newValue >= value) {
            if (counterRef.current) {
              clearInterval(counterRef.current);
            }
            return value;
          }
          return newValue;
        });
      }, 20);
    } else {
      setDisplayValue(0);
    }
    
    return () => {
      if (counterRef.current) {
        clearInterval(counterRef.current);
      }
    };
  }, [value, duration, isVisible]);
  
  return (
    <div className="card-container p-6">
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-lg bg-exertion-900/30 flex items-center justify-center text-exertion-400 mr-4">
          <Icon size={24} />
        </div>
        <div>
          <div className="text-3xl font-bold mb-1 flex items-end">
            <span>{displayValue}</span>
            <span>{suffix}</span>
          </div>
          <p className="text-zinc-400">{label}</p>
        </div>
      </div>
    </div>
  );
};

const stats = [
  { value: 15, suffix: "+", label: "Clientes", icon: Users },
  { value: 12, suffix: "+", label: "Proyectos Completados", icon: Briefcase },
  { value: 5, suffix: "+", label: "Proyectos nuevos", icon: FileText },
  { value: 1, suffix: "+", label: "Oficina Global", icon: MapPin },
  { value: 15, suffix: "+", label: "Años de Experiencia", icon: Clock },
  { value: 99, suffix: "%", label: "Garantía de Disponibilidad", icon: Server },
  { value: 99, suffix: "%", label: "Certificación Garantizada", icon: Shield },
  { value: 4.9, suffix: "/5", label: "Satisfacción del Cliente", icon: Star }
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="section-data section-padding relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-exertion-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-zinc-700/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-exertion-900/30 text-exertion-400 rounded-full text-sm font-medium mb-4">
            Nuestro Impacto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Historial Comprobado</h2>
          <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
            Nuestro éxito se mide por el éxito de nuestros clientes. Aquí tienes un vistazo a nuestros logros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Stat 
              key={index} 
              value={stat.value} 
              suffix={stat.suffix} 
              label={stat.label} 
              icon={stat.icon}
              isVisible={isVisible}
              duration={1500 + (index * 200)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
