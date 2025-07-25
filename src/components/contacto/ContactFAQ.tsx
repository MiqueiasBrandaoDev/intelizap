
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const ContactFAQ = () => {
  const faqItems: FAQItem[] = [
    {
      question: "¿Cuánto tiempo lleva implementar una solución completa?",
      answer: "El tiempo de implementación varía según la complejidad del proyecto, pero generalmente oscila entre 4-12 semanas. Realizamos una evaluación detallada al inicio para proporcionar un cronograma preciso."
    },
    {
      question: "¿Ofrecen servicios de capacitación para nuestro personal?",
      answer: "Sí, proporcionamos capacitación completa para asegurar que su equipo pueda utilizar eficazmente los sistemas implementados. Esto incluye sesiones presenciales y recursos online."
    },
    {
      question: "¿Sus soluciones se integran con los sistemas existentes?",
      answer: "Absolutamente. Diseñamos nuestras soluciones para integrarse perfectamente con sus sistemas existentes, minimizando interrupciones y maximizando el retorno de su inversión tecnológica actual."
    },
    {
      question: "¿Qué tipo de soporte ofrecen después de la implementación?",
      answer: "Ofrecemos varios niveles de soporte post-implementación, desde soporte técnico básico hasta mantenimiento y optimización continuos. Podemos personalizar un plan de soporte que se adapte a sus necesidades específicas."
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
            <p className="text-zinc-300">{item.answer}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          to="/servicios" 
          className="text-exertion-400 font-medium hover:text-exertion-300 flex items-center justify-center"
        >
          <span>Ver más preguntas frecuentes</span>
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ContactFAQ;
