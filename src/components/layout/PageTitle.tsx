
import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const PageTitle = ({ 
  title, 
  subtitle, 
  align = "center",
  className = "" 
}: PageTitleProps) => {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  return (
    <div className={`mb-8 ${alignClass[align]} ${className}`}>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gradient">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
