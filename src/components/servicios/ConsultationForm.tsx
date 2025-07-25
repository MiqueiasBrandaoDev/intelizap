
import React from "react";

const ConsultationForm = () => {
  return (
    <div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700">
      <h3 className="text-2xl font-bold mb-6 text-center">Contacto</h3>
      <p className="text-center text-zinc-300 mb-4">
        Para más información sobre nuestros servicios, contáctenos directamente:
      </p>
      <div className="text-center">
        <div className="mb-2">
          <span className="font-semibold">Email:</span> jcastro@exertionai.com
        </div>
        <div className="mb-2">
          <span className="font-semibold">Teléfono:</span> +54 299 527 1420
        </div>
      </div>
    </div>
  );
};

export default ConsultationForm;
