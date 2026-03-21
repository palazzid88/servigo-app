"use client";

export default function Hero() {
  return (
    <header id="inicio" className="relative min-h-screen md:h-screen overflow-hidden flex items-center">
      
      {/* Imagen de fondo responsive */}
      <picture className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet="/img/banner-vertical.jpg" />
        <img
          src="/img/banner-horizontal.jpg"
          alt="Traslado de vehículo"
          className="w-full h-full object-cover animate-zoom"
        />
      </picture>

      {/* Overlay + contenido */}
      <div className="relative w-full bg-black/50 flex flex-col items-center justify-center text-center px-4 py-28 md:py-20">
        
        <div className="bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto">
          
          {/* Logo */}
          <img
            src="/img/logo.png"
            alt="Logo Servigo"
            className="h-16 md:h-20 w-auto mx-auto mb-6 transition-transform duration-500 hover:scale-105"
          />

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Tu auto se traslada, vos{" "}
            <span className="text-[#f29101]">seguís con tu día</span>
          </h1>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Coordinamos el retiro, llevamos tu vehículo al taller y te lo devolvemos, sin que tengas que moverte.
          </p>

          {/* Línea */}
          <hr className="w-32 md:w-80 border-t-2 border-[#f29101] opacity-80 mx-auto mb-10" />

          {/* Subtítulo */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Turnos
          </h2>

          {/* IMPORTANTE: acá después vamos a meter Turnos */}
        </div>
      </div>
    </header>
  );
}