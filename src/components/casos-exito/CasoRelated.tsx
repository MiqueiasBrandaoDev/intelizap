
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RelatedCase {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface CasoRelatedProps {
  relatedCases: RelatedCase[];
}

const CasoRelated = ({ relatedCases }: CasoRelatedProps) => {
  if (!relatedCases || relatedCases.length === 0) return null;
  
  return (
    <section className="py-16 bg-zinc-950 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-zinc-100">Casos Relacionados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedCases.map(relatedCase => (
              <Card key={relatedCase.id} className="bg-zinc-800 dark:bg-zinc-900 overflow-hidden hover:shadow-lg transition-shadow border-zinc-700">
                <div className="h-48 overflow-hidden">
                  <img
                    src={relatedCase.image}
                    alt={relatedCase.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-zinc-100">{relatedCase.title}</h3>
                  <p className="text-zinc-400 dark:text-zinc-400 line-clamp-2 mb-4">
                    {relatedCase.description}
                  </p>
                  <Link to={`/casos-de-exito/${relatedCase.id}`}>
                    <Button variant="outline" className="w-full border-zinc-600 text-zinc-200 hover:bg-zinc-700">
                      Ver caso
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CasoRelated;
