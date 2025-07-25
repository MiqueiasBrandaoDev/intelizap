
import React from "react";
import { Link } from "react-router-dom";

interface FooterLegalProps {
  links: {
    name: string;
    path: string;
  }[];
}

const FooterLegal = ({ links }: FooterLegalProps) => {
  return (
    <div className="hidden md:flex space-x-4 text-sm text-zinc-500 dark:text-zinc-500">
      {links.map((link, index) => (
        <Link key={index} to={link.path} className="hover:text-exertion-400 dark:hover:text-exertion-400 transition-colors">
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default FooterLegal;
