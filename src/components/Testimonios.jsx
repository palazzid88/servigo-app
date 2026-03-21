export default function Testimonios() {
  const testimonios = [
    {
      texto: "“Excelente servicio, puntualidad y comunicación constante. ¡Muy recomendable!”",
      autor: "— Javier M.",
    },
    {
      texto: "“Me ahorraron horas en el taller. Todo fue súper cómodo y profesional.”",
      autor: "— Carolina P.",
    },
    {
      texto: "“Un servicio distinto, moderno y eficiente. Los recomiendo sin dudar.”",
      autor: "— Diego L.",
    },
  ];

  return (
    <section id="testimonios" className="py-24 bg-[#565656] text-white">
      <div className="container mx-auto px-6 text-center max-w-5xl">
        
        <h2 className="text-4xl font-bold mb-12 text-[#f29101]">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonios.map((t, index) => (
            <div
              key={index}
              className="bg-white/10 p-6 rounded-2xl shadow-lg"
            >
              <p className="italic">{t.texto}</p>
              <h4 className="mt-4 font-semibold text-[#f29101]">
                {t.autor}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}