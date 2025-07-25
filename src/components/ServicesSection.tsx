
import React from "react";
import { 
  Layers, 
  Cpu, 
  PieChart, 
  BadgeCheck, 
  Shield, 
  Zap, 
  Database, 
  LineChart, 
  Terminal
} from "lucide-react";
import { Link } from "react-router-dom";

const servicesData = [
  {
    title: "Implementación de Sistemas",
    description: "Implementamos sistemas de gestión empresarial adaptados a tus requisitos específicos de negocio.",
    icon: Layers,
    color: "from-blue-500 to-purple-500",
    features: ["Integración Perfecta", "Flujos de Trabajo Personalizables", "Capacitación de Usuarios"]
  },
  {
    title: "Automatización de Procesos",
    description: "Transforma procesos manuales en flujos de trabajo automatizados eficientes que ahorran tiempo y reducen errores.",
    icon: Cpu,
    color: "from-green-500 to-teal-500",
    features: ["Soluciones RPA", "Optimización de Flujos", "Reducción de Errores"]
  },
  {
    title: "Inteligencia Empresarial",
    description: "Convierte tus datos en información accionable con nuestras soluciones integrales de BI y análisis.",
    icon: PieChart,
    color: "from-orange-500 to-amber-500",
    features: ["Paneles en Tiempo Real", "Análisis Predictivo", "Informes Personalizados"]
  },
  {
    title: "Control de Calidad",
    description: "Asegura que tus sistemas operen al máximo rendimiento con nuestros servicios exhaustivos de QA y pruebas.",
    icon: BadgeCheck,
    color: "from-red-500 to-pink-500",
    features: ["Pruebas Automatizadas", "Pruebas de Rendimiento", "Verificaciones de Cumplimiento"]
  },
  {
    title: "Soluciones de Seguridad",
    description: "Protege tus activos digitales con soluciones de seguridad y cumplimiento de nivel empresarial.",
    icon: Shield,
    color: "from-indigo-500 to-blue-600",
    features: ["Detección de Amenazas", "Marco de Cumplimiento", "Auditorías de Seguridad"]
  },
  {
    title: "Optimización de Rendimiento",
    description: "Maximiza la eficiencia y minimiza el tiempo de inactividad con nuestros servicios de optimización del rendimiento del sistema.",
    icon: Zap,
    color: "from-amber-500 to-yellow-500",
    features: ["Balanceo de Carga", "Optimización de Código", "Gestión de Recursos"]
  },
  {
    title: "Gestión de Datos",
    description: "Soluciones integrales para almacenamiento, migración, integración y gobernanza de datos.",
    icon: Database,
    color: "from-cyan-500 to-blue-500",
    features: ["Migración de Datos", "Optimización de Bases de Datos", "Marcos de Gobernanza"]
  },
  {
    title: "Analítica y Reportes",
    description: "Transforma datos brutos en información significativa con herramientas avanzadas de análisis e informes.",
    icon: LineChart,
    color: "from-emerald-500 to-green-600",
    features: ["Informes Personalizados", "Análisis de Tendencias", "Paneles Ejecutivos"]
  },
  {
    title: "Modernización de Sistemas Heredados",
    description: "Actualiza y transforma sistemas obsoletos en plataformas modernas, escalables y eficientes.",
    icon: Terminal,
    color: "from-violet-500 to-purple-600",
    features: ["Evaluación de Sistemas", "Migración por Fases", "Actualización Tecnológica"]
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 right-0 w-72 h-72 bg-exertion-100 dark:bg-exertion-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-gray-100 dark:bg-gray-800/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-exertion-100 dark:bg-exertion-900/30 text-exertion-600 dark:text-exertion-400 rounded-full text-sm font-medium mb-4">
            Nuestras Soluciones
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Servicios Empresariales Integrales</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Proporcionamos una amplia gama de servicios diseñados para optimizar las operaciones de tu empresa, 
            automatizar flujos de trabajo e impulsar la transformación digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={index}
              className="service-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              <div className="p-6">
                <div className="mb-4 relative">
                  <div className={`w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br ${service.color} text-white transition-transform group-hover:scale-110`}>
                    <service.icon size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} mr-2`}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 pt-0 mt-auto">
                <Link 
                  to="/contacto" 
                  className="text-exertion-600 dark:text-exertion-400 font-medium hover:text-exertion-700 dark:hover:text-exertion-300 transition-colors text-sm"
                >
                  Saber Más →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
