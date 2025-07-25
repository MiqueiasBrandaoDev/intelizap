
import React, { useState } from "react";
import NavItem from "./NavItem";
import SearchForm from "./SearchForm";

interface MobileMenuProps {
  isOpen: boolean;
  navItems: Array<{
    name: string;
    path: string;
    subItems?: Array<{
      name: string;
      path: string;
    }>;
  }>;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ isOpen, navItems, setIsOpen }: MobileMenuProps) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-zinc-900 shadow-lg">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            item={item}
            isMobile={true}
            isOpen={item.name === "Servicios" && isServicesOpen}
            toggleSubMenu={() => setIsServicesOpen(!isServicesOpen)}
            closeMenu={() => setIsOpen(false)}
          />
        ))}
        
        <SearchForm isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenu;
