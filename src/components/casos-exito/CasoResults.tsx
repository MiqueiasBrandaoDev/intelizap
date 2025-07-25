
import React from "react";
import { BarChart, CheckCircle } from "lucide-react";

interface CasoResultsProps {
  results: string[];
  detailedParagraphs: string[];
}

const CasoResults = ({ results, detailedParagraphs }: CasoResultsProps) => {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-4 flex items-center text-zinc-300 dark:text-zinc-200">
        <BarChart size={24} className="mr-3" />
        Resultados Obtenidos
      </h3>
      
      <div className="bg-zinc-800 dark:bg-zinc-900 rounded-xl p-6 mb-8">
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-zinc-200 dark:text-zinc-200">{result}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {detailedParagraphs.map((paragraph, i) => (
          <p key={i} className="mb-4 text-zinc-300 dark:text-zinc-300">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CasoResults;
