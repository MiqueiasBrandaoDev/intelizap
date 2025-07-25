
import React from "react";
import CasoCompanyHeader from "./CasoCompanyHeader";
import CasoChallenge from "./CasoChallenge";
import CasoSolution from "./CasoSolution";
import CasoResults from "./CasoResults";
import CasoConclusion from "./CasoConclusion";
import CasoAuthor from "./CasoAuthor";
import CasoCTA from "./CasoCTA";

interface CasoContentProps {
  image: string;
  logo: string;
  company: string;
  challengeDetailed: string[];
  solutionDetailed: string[];
  keyFeatures?: { title: string; description: string }[];
  results: string[];
  resultsDetailed: string[];
  conclusion: string[];
}

const CasoContent = ({
  image,
  logo,
  company,
  challengeDetailed,
  solutionDetailed,
  keyFeatures,
  results,
  resultsDetailed,
  conclusion
}: CasoContentProps) => {
  return (
    <section className="py-10 bg-zinc-900 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8">
              <img 
                src={image} 
                alt={company}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CasoCompanyHeader logo={logo} company={company} />
            <CasoChallenge paragraphs={challengeDetailed} />
            <CasoSolution paragraphs={solutionDetailed} keyFeatures={keyFeatures} />
            <CasoResults results={results} detailedParagraphs={resultsDetailed} />
            <CasoConclusion paragraphs={conclusion} />
            <CasoAuthor 
              name="Jorge Castro" 
              role="Fundador, Exertion Solutions" 
              avatar="/lovable-uploads/3c271192-cba5-4905-b2d1-65a0246b8b50.png" 
            />
          </div>
          
          <CasoCTA />
        </div>
      </div>
    </section>
  );
};

export default CasoContent;
