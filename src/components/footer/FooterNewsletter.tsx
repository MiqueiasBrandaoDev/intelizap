
import React from "react";

const FooterNewsletter = () => {
  return (
    <div className="py-12 border-b border-zinc-800 dark:border-zinc-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-white">Mantente Actualizado</h3>
          <p className="text-zinc-400 dark:text-zinc-400 mb-4">
            Sigue nuestros canales sociales para recibir los últimos conocimientos del sector, noticias de la empresa y actualizaciones tecnológicas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterNewsletter;
