
import React from "react";

interface CasoAuthorProps {
  name: string;
  role: string;
  avatar: string;
}

const CasoAuthor = ({ name, role, avatar }: CasoAuthorProps) => {
  return (
    <div className="border-t border-zinc-700 dark:border-zinc-800 pt-8">
      <div className="flex items-center">
        <img
          src={avatar}
          alt={name}
          className="w-14 h-14 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-semibold text-zinc-100 dark:text-zinc-100">{name}</p>
          <p className="text-sm text-zinc-400 dark:text-zinc-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default CasoAuthor;
