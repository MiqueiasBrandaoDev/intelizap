
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, Clock } from "lucide-react";

const FooterContactInfo = () => {
  return (
    <div className="lg:col-span-2">
      <Link to="/" className="flex items-center mb-6">
        <span className="text-2xl font-bold text-exertion-600 dark:text-exertion-400">Exertion</span>
        <span className="text-xl font-medium text-white">Solutions</span>
      </Link>
      <p className="text-zinc-400 dark:text-zinc-400 mb-6 max-w-md">
        Transformamos negocios a través de sistemas y procesos digitales inteligentes. Innovación, eficiencia y excelencia para impulsar su crecimiento empresarial.
      </p>
      <div className="space-y-4">
        <div className="flex items-start">
          <Mail size={18} className="text-exertion-400 mr-3 mt-0.5" />
          <a href="mailto:jcastro@exertionai.com" className="text-zinc-400 dark:text-zinc-400 hover:text-exertion-400 dark:hover:text-exertion-400">
            jcastro@exertionai.com
          </a>
        </div>
        <div className="flex items-start">
          <Phone size={18} className="text-exertion-400 mr-3 mt-0.5" />
          <a href="tel:+542995271420" className="text-zinc-400 dark:text-zinc-400 hover:text-exertion-400 dark:hover:text-exertion-400">
            +54 299 527 1420
          </a>
        </div>
        <div className="flex items-start">
          <Globe size={18} className="text-exertion-400 mr-3 mt-0.5" />
          <a href="https://www.exertionai.com" className="text-zinc-400 dark:text-zinc-400 hover:text-exertion-400 dark:hover:text-exertion-400">
            www.exertionai.com
          </a>
        </div>
        <div className="flex items-start">
          <MapPin size={18} className="text-exertion-400 mr-3 mt-0.5" />
          <address className="text-zinc-400 dark:text-zinc-400 not-italic">
            Neuquén Capital<br />
            Provincia de Neuquén, Argentina
          </address>
        </div>
        <div className="flex items-start">
          <Clock size={18} className="text-exertion-400 mr-3 mt-0.5" />
          <span className="text-zinc-400 dark:text-zinc-400">
            Lun - Vie: 9:00 - 18:00
          </span>
        </div>
      </div>
    </div>
  );
};

export default FooterContactInfo;
