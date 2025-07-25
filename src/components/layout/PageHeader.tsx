
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageHeader = ({ title, description, breadcrumbs = [] }: PageHeaderProps) => {
  return (
    <section className="section-header py-14 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {description && (
            <p className="text-xl mb-6">{description}</p>
          )}
          
          {breadcrumbs.length > 0 && (
            <div className="flex justify-center space-x-2 text-sm">
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <ChevronRight size={16} />}
                  {item.path ? (
                    <Link to={item.path} className="hover:underline">{item.label}</Link>
                  ) : (
                    <span className="font-medium">{item.label}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
