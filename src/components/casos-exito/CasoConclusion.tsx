
import React from "react";

interface CasoConclusionProps {
  paragraphs: string[];
}

const CasoConclusion = ({ paragraphs }: CasoConclusionProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4 flex items-center text-zinc-300 dark:text-zinc-200">
        Conclusión
      </h3>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="mb-4 text-zinc-300 dark:text-zinc-300">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CasoConclusion;
