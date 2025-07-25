
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import NavbarProgressBar from "./navbar/NavbarProgressBar";
import DesktopNav from "./navbar/DesktopNav";
import MobileMenu from "./navbar/MobileMenu";
import ThemeToggle from "./navbar/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      // For navbar background
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      // For progress bar
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Nosotros", path: "/sobre-nosotros" },
    {
      name: "Servicios",
      path: "/servicios",
      subItems: [
        { name: "Implementación de Sistemas", path: "/servicios/implementacion" },
        { name: "Soluciones de Automatización", path: "/servicios/automatizacion" },
        { name: "Servicios de Consultoría", path: "/servicios/consultoria" },
        { name: "Transformación Digital", path: "/servicios/transformacion" },
      ],
    },
    { name: "Casos de Éxito", path: "/casos-de-exito" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <NavbarProgressBar progress={scrollProgress} />
      <nav
        className={`${
          isScrolled
            ? "bg-zinc-900/90 backdrop-blur-md shadow-md"
            : "bg-zinc-900/70"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-exertion-400">Exertion</span>
                <span className="text-xl font-medium text-zinc-200">Solutions</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <DesktopNav 
              navItems={navItems} 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
            />

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-zinc-200"
                aria-label="Abrir menú"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <MobileMenu isOpen={isOpen} navItems={navItems} setIsOpen={setIsOpen} />
      </nav>
    </header>
  );
};

export default Navbar;
