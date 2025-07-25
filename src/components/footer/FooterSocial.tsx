
import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const FooterSocial = () => {
  return (
    <div className="flex space-x-6">
      <a href="#" className="text-zinc-500 dark:text-zinc-500 hover:text-exertion-400 dark:hover:text-exertion-400 transition-colors" aria-label="Facebook">
        <Facebook size={20} />
      </a>
      <a href="#" className="text-zinc-500 dark:text-zinc-500 hover:text-exertion-400 dark:hover:text-exertion-400 transition-colors" aria-label="Twitter">
        <Twitter size={20} />
      </a>
      <a href="#" className="text-zinc-500 dark:text-zinc-500 hover:text-exertion-400 dark:hover:text-exertion-400 transition-colors" aria-label="LinkedIn">
        <Linkedin size={20} />
      </a>
      <a href="#" className="text-zinc-500 dark:text-zinc-500 hover:text-exertion-400 dark:hover:text-exertion-400 transition-colors" aria-label="Instagram">
        <Instagram size={20} />
      </a>
      <a href="#" className="text-zinc-500 dark:text-zinc-500 hover:text-exertion-400 dark:hover:text-exertion-400 transition-colors" aria-label="YouTube">
        <Youtube size={20} />
      </a>
    </div>
  );
};

export default FooterSocial;
