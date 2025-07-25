
import React from "react";
import { TrendingUp } from "lucide-react";

interface CasoChallengeProps {
  paragraphs: string[];
}

const CasoChallenge = ({ paragraphs }: CasoChallengeProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4 flex items-center text-zinc-300 dark:text-zinc-200">
        <TrendingUp size={24} className="mr-3" />
        El Desafío
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

export default CasoChallenge;
