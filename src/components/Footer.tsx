
import React from "react";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterContactInfo from "./footer/FooterContactInfo";
import FooterLinks from "./footer/FooterLinks";
import FooterSocial from "./footer/FooterSocial";
import FooterLegal from "./footer/FooterLegal";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    services: [
      { name: "Implementación de Sistemas", path: "/servicios/implementacion" },
      { name: "Automatización de Procesos", path: "/servicios/automatizacion" },
      { name: "Consultoría Empresarial", path: "/servicios/consultoria" },
      { name: "Transformación Digital", path: "/servicios/transformacion" }
    ],
    company: [
      { name: "Sobre Nosotros", path: "/sobre-nosotros" },
      { name: "Casos de Éxito", path: "/casos-de-exito" },
      { name: "Testimonios", path: "/testimonios" }
    ],
    legal: [
      { name: "Política de Privacidad", path: "/legal/privacidad" },
      { name: "Términos de Servicio", path: "/legal/terminos" },
      { name: "Política de Cookies", path: "/legal/cookies" },
      { name: "Cumplimiento RGPD", path: "/legal/gdpr" },
      { name: "Accesibilidad", path: "/legal/accesibilidad" }
    ]
  };
  
  return (
    <footer className="bg-zinc-900 dark:bg-zinc-950 border-t border-zinc-800 dark:border-zinc-800">
      <div className="container mx-auto px-4">
        {/* Top section with newsletter */}
        <FooterNewsletter />
        
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <FooterContactInfo />
          
          {/* Service Links */}
          <FooterLinks title="Servicios" links={footerLinks.services} />
          
          {/* Company Links */}
          <FooterLinks title="Empresa" links={footerLinks.company} />
        </div>
        
        {/* Bottom bar */}
        <div className="py-6 border-t border-zinc-800 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-zinc-500 dark:text-zinc-500 text-sm mb-4 md:mb-0">
              © {currentYear} Exertion Solutions. Todos los derechos reservados.
            </div>
            
            <FooterSocial />
            
            <FooterLegal links={footerLinks.legal} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
