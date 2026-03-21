"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md text-white z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2">
          <img src="/img/logo.png" alt="Logo Servigo" className="h-10 w-auto" />
        </a>

        {/* Botón móvil */}
        <button onClick={() => setOpen(!open)} className="md:hidden focus:outline-none">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Menú */}
        <div
          className={`${
            open ? "flex" : "hidden"
          } flex-col md:flex md:flex-row items-center gap-4 md:gap-6 text-lg font-medium absolute md:static top-full left-0 w-full md:w-auto bg-black/90 md:bg-transparent p-6 md:p-0 text-center transition-all duration-300`}
        >
          <a href="#inicio" onClick={handleLinkClick} className="hover:text-[#f29101]">
            Inicio
          </a>
          <a href="#porque-elegirnos" onClick={handleLinkClick} className="hover:text-[#f29101]">
            Por qué elegirnos
          </a>
          <a href="#como-funciona" onClick={handleLinkClick} className="hover:text-[#f29101]">
            Cómo funciona
          </a>
          <a href="#testimonios" onClick={handleLinkClick} className="hover:text-[#f29101]">
            Testimonios
          </a>
        </div>
      </div>
    </nav>
  );
}