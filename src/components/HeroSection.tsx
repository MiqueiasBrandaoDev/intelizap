
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Database, Cpu, Cloud, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      
      // Calculate mouse position relative to the center of the scene
      const rect = sceneRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized values between -1 and 1
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);
      
      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const parallaxElements = heroRef.current.querySelectorAll('.parallax');
      
      parallaxElements.forEach((el, index) => {
        const speed = index * 0.1 + 0.2;
        (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Start animation sequence when component mounts
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('services');
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="min-h-screen relative flex items-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800"
    >
      {/* Digital circuit lines background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0,50 L100,50 M50,0 L50,100 M0,0 L100,100 M0,100 L100,0" stroke="white" strokeWidth="0.5" fill="none" />
              <circle cx="50" cy="50" r="3" fill="white" />
              <circle cx="0" cy="0" r="2" fill="white" />
              <circle cx="100" cy="0" r="2" fill="white" />
              <circle cx="0" cy="100" r="2" fill="white" />
              <circle cx="100" cy="100" r="2" fill="white" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>
      </div>

      {/* Animated particle dots */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index}
            className="absolute bg-exertion-400 rounded-full opacity-30 animate-pulse"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDuration: (Math.random() * 3 + 2) + 's',
              animationDelay: (Math.random() * 2) + 's'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-32 md:py-20 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0 md:pr-12">
          <span className="inline-block animate-fade-in px-3 py-1 bg-exertion-500/20 text-exertion-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-exertion-500/30">
            Transformación Digital
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-zinc-100 animate-slide-in-top" style={{ animationDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-exertion-300 via-exertion-400 to-exertion-500 bg-clip-text text-transparent">Revoluciona</span> tu 
            <span className="bg-gradient-to-r from-exertion-400 via-exertion-300 to-exertion-200 bg-clip-text text-transparent"> Negocio Digital</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-8 animate-slide-in-top" style={{ animationDelay: '0.2s' }}>
            Automatización inteligente, digitalización de procesos y transformación empresarial para impulsar tu empresa hacia el futuro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-in-top" style={{ animationDelay: '0.3s' }}>
            <Link to="/contacto" className="px-8 py-3 bg-exertion-600 text-zinc-100 rounded-lg hover:bg-exertion-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-exertion-500/20 hover:-translate-y-1 transition-all duration-300">
              <span>Digitaliza tu Empresa</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/casos-de-exito" className="px-8 py-3 bg-transparent border border-exertion-400/30 text-exertion-300 rounded-lg hover:bg-exertion-900/20 transition-colors backdrop-blur-sm">
              Ver Casos de Éxito
            </Link>
          </div>
        </div>

        {/* 3D Scene */}
        <div 
          ref={sceneRef}
          className="md:w-1/2 h-80 md:h-96 perspective-1000 relative"
        >
          <div className={`w-full h-full relative transition-all duration-700 transform ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* 3D Floating Elements */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
              style={{
                transform: `translate(-50%, -50%) rotateX(${-mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`
              }}
            >
              {/* Center sphere - data hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-exertion-600 to-exertion-400 glow-blue-400 z-20 flex items-center justify-center">
                <Database className="text-zinc-100 w-12 h-12" />
              </div>

              {/* Orbiting elements */}
              <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full border border-exertion-400/30 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow z-10">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-400/20">
                  <Cpu className="text-zinc-100 w-6 h-6" />
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full border border-exertion-400/20 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow-reverse z-0">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-400/20">
                  <Cloud className="text-zinc-100 w-7 h-7" />
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full border border-exertion-400/10 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow-2 z-0">
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-exertion-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-exertion-400/20">
                  <Monitor className="text-zinc-100 w-6 h-6" />
                </div>
              </div>

              {/* Connection lines */}
              <div className="absolute inset-0 w-full h-full z-0">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                  <line x1="50%" y1="50%" x2="50%" y2="20%" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" strokeDasharray="5,5" />
                  <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="rgba(167, 139, 250, 0.5)" strokeWidth="1" strokeDasharray="5,5" />
                  <line x1="50%" y1="50%" x2="20%" y2="50%" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1" strokeDasharray="5,5" />
                </svg>
              </div>
            </div>

            {/* Glowing effects */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-exertion-600/10 filter blur-xl animate-pulse-slow" />
              <div className="w-48 h-48 rounded-full bg-exertion-400/10 filter blur-xl animate-pulse-slow-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
        <button onClick={scrollToNextSection} className="flex flex-col items-center text-exertion-300 hover:text-exertion-200 transition-colors">
          <span className="text-sm mb-1">Desplazar Abajo</span>
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
