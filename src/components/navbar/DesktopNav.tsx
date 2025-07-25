
import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import SearchForm from "./SearchForm";
import ThemeToggle from "./ThemeToggle";

interface DesktopNavProps {
  navItems: Array<{
    name: string;
    path: string;
    subItems?: Array<{
      name: string;
      path: string;
    }>;
  }>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DesktopNav = ({ navItems, isDarkMode, toggleDarkMode }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      {navItems.map((item, index) => (
        <NavItem key={index} item={item} />
      ))}
      
      <SearchForm />
      
      <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default DesktopNav;
