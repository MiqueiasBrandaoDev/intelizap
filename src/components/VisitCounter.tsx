
import React, { useState, useEffect } from "react";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(1000);
  
  useEffect(() => {
    // Intentar obtener el contador actual del localStorage
    const storedCount = localStorage.getItem('visitCount');
    
    if (storedCount) {
      // Si existe un valor almacenado, usarlo
      setVisitCount(parseInt(storedCount));
      // Incrementar el contador y almacenarlo
      const newCount = parseInt(storedCount) + 1;
      localStorage.setItem('visitCount', newCount.toString());
    } else {
      // Si no existe un valor almacenado, inicializar con 1000
      localStorage.setItem('visitCount', '1000');
    }
  }, []);

  return (
    <div className="fixed bottom-5 right-5 bg-zinc-800/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg z-40 border border-zinc-700">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">
          <span className="font-bold">{visitCount}</span> visitantes
        </span>
      </div>
    </div>
  );
};

export default VisitCounter;
