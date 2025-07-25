
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

interface SubItem {
  name: string;
  path: string;
}

interface NavItemProps {
  item: {
    name: string;
    path: string;
    subItems?: SubItem[];
  };
  isMobile?: boolean;
  isOpen?: boolean;
  toggleSubMenu?: () => void;
  closeMenu?: () => void;
}

const NavItem = ({ 
  item, 
  isMobile = false, 
  isOpen = false, 
  toggleSubMenu, 
  closeMenu 
}: NavItemProps) => {
  const location = useLocation();
  
  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  if (item.subItems) {
    return isMobile ? (
      <div className="space-y-1">
        <button
          onClick={toggleSubMenu}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors font-medium ${
            isLinkActive(item.path) 
              ? "text-exertion-400" 
              : "text-zinc-200 hover:bg-zinc-800"
          }`}
        >
          <span>{item.name}</span>
          <ChevronDown size={14} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="pl-4 space-y-1">
            {item.subItems.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={subItem.path}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isLinkActive(subItem.path) 
                    ? "text-exertion-400 font-medium" 
                    : "text-zinc-200 hover:bg-zinc-800"
                }`}
                onClick={closeMenu}
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    ) : (
      <div className="relative group">
        <Link
          to={item.path}
          className={`flex items-center space-x-1 px-3 py-2 transition-colors font-medium ${
            isLinkActive(item.path) 
              ? "text-exertion-400" 
              : "text-zinc-200 hover:text-exertion-400"
          }`}
        >
          <span>{item.name}</span>
          <ChevronDown size={14} />
        </Link>
        <div className="absolute left-0 mt-2 w-64 origin-top-left rounded-md shadow-lg bg-zinc-800 ring-1 ring-zinc-700 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {item.subItems.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={subItem.path}
                className={`block px-4 py-2 text-sm hover:bg-zinc-700 transition-colors ${
                  isLinkActive(subItem.path) 
                    ? "text-exertion-400 font-medium" 
                    : "text-zinc-200"
                }`}
                role="menuitem"
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`${isMobile ? 'block' : ''} px-3 py-2 ${isMobile ? 'rounded-md' : ''} transition-colors font-medium ${
        isLinkActive(item.path) 
          ? "text-exertion-400" 
          : `text-zinc-200 ${isMobile ? 'hover:bg-zinc-800' : 'hover:text-exertion-400'}`
      }`}
      onClick={isMobile ? closeMenu : undefined}
    >
      {item.name}
    </Link>
  );
};

export default NavItem;
