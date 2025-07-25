
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface FooterLinksProps {
  title: string;
  links: {
    name: string;
    path: string;
  }[];
}

const FooterLinks = ({ title, links }: FooterLinksProps) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-6 text-white">{title}</h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path} className="text-zinc-400 dark:text-zinc-400 hover:text-exertion-400 dark:hover:text-exertion-400 transition-colors flex items-center">
              <ArrowRight size={14} className="mr-2" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
