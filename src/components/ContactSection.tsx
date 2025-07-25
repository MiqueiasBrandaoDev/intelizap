
import React from "react";
import { 
  Mail, 
  Phone, 
  MapPin,
  MessageCircle
} from "lucide-react";

const ContactSection = () => {
  // WhatsApp URL with the phone number
  const whatsappUrl = "https://wa.me/542995271420";
  
  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-exertion-100 dark:bg-exertion-900/30 text-exertion-600 dark:text-exertion-400 rounded-full text-sm font-medium mb-4">
            Contáctanos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ponte en Contacto</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            ¿Listo para transformar las operaciones de tu empresa? Comunícate con nuestro equipo de expertos para discutir tus necesidades.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Information - Adjusted size with max-w-3xl */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 md:p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-5">Información de Contacto</h3>
            
            {/* Exertion Logo Image - Now inside the contact information section */}
            <div className="mb-6">
              <img 
                src="/lovable-uploads/36a76ef3-1891-4971-a111-9ec3b71f9178.png" 
                alt="Exertion Logo" 
                className="w-full h-auto rounded-lg shadow-lg animate-pulse-soft"
              />
            </div>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-exertion-100 dark:bg-exertion-900/30 flex items-center justify-center text-exertion-600 dark:text-exertion-400 mr-4">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a href="mailto:jcastro@exertionai.com" className="hover:text-exertion-600 dark:hover:text-exertion-400 transition-colors">
                    jcastro@exertionai.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-exertion-100 dark:bg-exertion-900/30 flex items-center justify-center text-exertion-600 dark:text-exertion-400 mr-4">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Teléfono</p>
                  <a href="tel:+542995271420" className="hover:text-exertion-600 dark:hover:text-exertion-400 transition-colors">
                    +54 299 527 1420
                  </a>
                </div>
              </div>
              {/* WhatsApp Contact - New section */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp</p>
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    Enviar mensaje de WhatsApp
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-exertion-100 dark:bg-exertion-900/30 flex items-center justify-center text-exertion-600 dark:text-exertion-400 mr-4">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Oficina</p>
                  <address className="not-italic">
                    Neuquén Capital<br />
                    Provincia de Neuquén, Argentina
                  </address>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3">Horario de Oficina</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Lunes - Viernes:</span> 9:00 - 18:00</p>
                <p><span className="font-medium">Sábado:</span> 10:00 - 16:00</p>
                <p><span className="font-medium">Domingo:</span> Cerrado</p>
              </div>
            </div>

            {/* Map showing Neuquén, Argentina - Reduced height */}
            <div className="mt-6 rounded-lg h-40 overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d197075.19260599426!2d-68.26339215!3d-38.95212445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a33ba35eb8e35%3A0x6220acb810e3e2f5!2sNeuqu%C3%A9n%2C%20Argentina!5e0!3m2!1sen!2sus!4v1711463660353!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
                title="Ubicación de Exertion Solutions"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
