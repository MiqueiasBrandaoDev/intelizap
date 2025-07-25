
import React from "react";

interface CasoCompanyHeaderProps {
  logo: string;
  company: string;
}

const CasoCompanyHeader = ({ logo, company }: CasoCompanyHeaderProps) => {
  return (
    <div className="flex items-center mb-8">
      <img 
        src={logo} 
        alt={`Logo ${company}`}
        className="h-12 mr-6"
      />
      <h2 className="text-xl font-semibold text-zinc-100 dark:text-zinc-50">
        {company}
      </h2>
    </div>
  );
};

export default CasoCompanyHeader;
