export default function Servicios() {
  return (
    <section id="porque-elegirnos" className="py-24 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Imagen */}
        <div className="md:w-1/2">
          <img
            src="/img/porque-elegirnos.jpg"
            alt="Servicio de traslado"
            className="rounded-3xl shadow-2xl"
          />
        </div>

        {/* Contenido */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-[#f29101]">
            ¿Por qué elegir Servigo?
          </h2>

          <p className="text-lg leading-relaxed text-[#565656]/90">
            Nos ocupamos de todo el proceso: retiro, traslado, entrega y comunicación con el taller.
            Así, vos ganás tiempo y tranquilidad.
          </p>

          <ul className="space-y-3 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-[#f29101] mt-1">✔</span>
              Conductores profesionales y asegurados.
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#f29101] mt-1">✔</span>
              Seguimiento del traslado en tiempo real.
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#f29101] mt-1">✔</span>
              Comunicación directa y transparente.
            </li>
          </ul>

          {/* CTA */}
          <a
            href="#turnos"
            className="inline-block bg-[#f29101] text-white px-8 py-3 rounded-lg font-semibold mt-6 transition-all duration-300 hover:bg-[#d88000] hover:scale-105"
          >
            Solicitá tu turno
          </a>
        </div>
      </div>
    </section>
  );
}