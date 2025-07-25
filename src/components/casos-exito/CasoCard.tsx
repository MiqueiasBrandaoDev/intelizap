
import React from "react";
import { Link } from "react-router-dom";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CasoCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  industry: string;
  readTime: number;
  date: string;
  fullWidth?: boolean;
}

const CasoCard = ({ id, image, title, description, industry, readTime, date, fullWidth = false }: CasoCardProps) => {
  if (fullWidth) {
    return (
      <Card className="bg-zinc-800 border-zinc-700 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 h-48 md:h-auto overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
          
          <div className="md:w-3/5 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-zinc-700 text-exertion-400 px-3 py-1 rounded-full text-xs font-medium">
                {industry}
              </span>
              <div className="flex items-center text-zinc-400 text-sm">
                <Clock size={14} className="mr-1" />
                <span>{readTime} min</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 line-clamp-2 text-zinc-100">{title}</h3>
            
            <p className="text-zinc-300 mb-4 line-clamp-2">
              {description}
            </p>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center text-zinc-400 text-sm">
                <Calendar size={14} className="mr-1" />
                <span>{date}</span>
              </div>
              
              <Link to={`/casos-de-exito/${id}`}>
                <Button variant="outline" size="sm" className="border-zinc-600 hover:bg-zinc-700 hover:text-exertion-400">
                  Ver caso
                  <ChevronRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-800 border-zinc-700 flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-zinc-700 text-exertion-400 px-3 py-1 rounded-full text-xs font-medium">
            {industry}
          </span>
          <div className="flex items-center text-zinc-400 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{readTime} min</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 line-clamp-2 text-zinc-100">{title}</h3>
        
        <p className="text-zinc-300 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center text-zinc-400 text-sm">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
          
          <Link to={`/casos-de-exito/${id}`}>
            <Button variant="outline" size="sm" className="border-zinc-600 hover:bg-zinc-700 hover:text-exertion-400">
              Ver caso
              <ChevronRight size={14} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CasoCard;
