
import React from "react";
import { MessageSquare, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface KeyFeature {
  title: string;
  description: string;
}

interface CasoSolutionProps {
  paragraphs: string[];
  keyFeatures?: KeyFeature[];
}

const CasoSolution = ({ paragraphs, keyFeatures }: CasoSolutionProps) => {
  return (
    <div className="mb-10">
      <h3 className="text-2xl font-bold mb-4 flex items-center text-zinc-300 dark:text-zinc-200">
        <MessageSquare size={24} className="mr-3" />
        Nuestra Solución
      </h3>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="mb-4 text-zinc-300 dark:text-zinc-300">
            {paragraph}
          </p>
        ))}
      </div>
      
      {keyFeatures && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyFeatures.map((feature, index) => (
            <Card key={index} className="bg-zinc-800 dark:bg-zinc-900 border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-start">
                  <div className="bg-zinc-700 dark:bg-zinc-800 p-2 rounded-full mr-4">
                    <CheckCircle className="h-5 w-5 text-zinc-300 dark:text-zinc-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-zinc-100">{feature.title}</h4>
                    <p className="text-sm text-zinc-400 dark:text-zinc-400">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CasoSolution;
