
import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactInfo = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-zinc-800 text-exertion-400 rounded-lg flex items-center justify-center mr-4">
            <Phone size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Teléfono</h3>
            <p className="text-zinc-300">+54 299 527 1420</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-12 h-12 bg-zinc-800 text-exertion-400 rounded-lg flex items-center justify-center mr-4">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Correo Electrónico</h3>
            <p className="text-zinc-300">jcastro@exertionai.com</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-12 h-12 bg-zinc-800 text-exertion-400 rounded-lg flex items-center justify-center mr-4">
            <MapPin size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Dirección</h3>
            <p className="text-zinc-300">
              Neuquén Capital<br />
              Provincia de Neuquén, Argentina
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-12 h-12 bg-zinc-800 text-exertion-400 rounded-lg flex items-center justify-center mr-4">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Horario de Atención</h3>
            <p className="text-zinc-300">
              Lunes a Viernes: 9:00 - 18:00<br />
              Sábados y Domingos: Cerrado
            </p>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="mt-8">
        <div className="bg-zinc-800 h-64 rounded-xl overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d197075.19260599426!2d-68.26339215!3d-38.95212445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a33ba35eb8e35%3A0x6220acb810e3e2f5!2sNeuqu%C3%A9n%2C%20Argentina!5e0!3m2!1sen!2sus!4v1711463660353!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Exertion Solutions"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
