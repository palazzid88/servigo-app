"use client";

import { useEffect, useRef } from "react";

export default function ComoFunciona() {
  const videoDesktopRef = useRef(null);
  const videoMobileRef = useRef(null);

  useEffect(() => {
    const video =
      window.innerWidth >= 768
        ? videoDesktopRef.current
        : videoMobileRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused && video.currentTime === 0) {
            video.play();
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="py-24 bg-[#f8f8f8] text-center">
      <div className="container mx-auto px-6">
        
        <h2 className="text-4xl font-bold text-[#565656] mb-12">
          Cómo funciona
        </h2>

        {/* Video Desktop */}
        <video
          ref={videoDesktopRef}
          className="hidden md:block w-full max-w-6xl mx-auto rounded-2xl shadow-2xl"
          muted
          playsInline
          preload="auto"
          poster="/img/horizontal.png"
        >
          <source src="/videos/como-funciona1.mp4" type="video/mp4" />
        </video>

        {/* Video Mobile */}
        <video
          ref={videoMobileRef}
          className="block md:hidden w-full max-w-md mx-auto rounded-2xl shadow-2xl"
          muted
          playsInline
          preload="auto"
          poster="/img/vertical.png"
        >
          <source src="/videos/como-funciona2.mp4" type="video/mp4" />
        </video>

        {/* Espaciado */}
        <div className="my-12"></div>

        {/* Imagen */}
        <img
          src="/img/volante.png"
          alt="Servicio de traslado"
          className="mx-auto mb-6"
        />

        {/* Texto */}
        <p className="text-lg md:text-xl text-[#565656]/90 max-w-4xl mx-auto leading-relaxed">
          En <strong className="text-[#f29101]">Servigo</strong> te ayudamos a administrar tu tiempo.
          Nuestro servicio está diseñado para que no tengas que preocuparte por el traslado de tu vehículo:
          lo retiramos, lo llevamos al taller y te lo devolvemos listo, sin que tengas que moverte.
          Sabemos que muchas veces <strong>no cuentas con el tiempo</strong> para gestionar el mantenimiento o las reparaciones.
          Con nuestro servicio, podés seguir con tu día mientras nosotros nos encargamos de todo.
          Olvidate del tráfico, las esperas y la falta de tiempo — nosotros nos ocupamos de todo con seguridad,
          confianza y profesionalismo.
        </p>

        {/* Botón */}
        <a
          href="#inicio"
          className="inline-block bg-[#f29101] text-white px-8 py-3 rounded-lg font-semibold mt-6 transition-all duration-300 hover:bg-[#d88000] hover:scale-105"
        >
          Solicitá tu turno
        </a>
      </div>
    </section>
  );
}