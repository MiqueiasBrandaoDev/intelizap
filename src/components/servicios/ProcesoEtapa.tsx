
import React, { ReactNode } from "react";

interface ProcesoEtapaProps {
  number: number;
  title: string;
  description: string;
}

const ProcesoEtapa = ({ number, title, description }: ProcesoEtapaProps) => {
  return (
    <div className="bg-zinc-800 rounded-xl p-6 shadow-md">
      <div className="w-12 h-12 bg-zinc-700 text-exertion-400 rounded-full flex items-center justify-center text-xl font-bold mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
};

export default ProcesoEtapa;
