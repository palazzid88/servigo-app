"use client";

import { useEffect } from "react";

export default function Turnos() {
  useEffect(() => {
    // Loader oficial de Cal.com (IMPORTANTE)
    (function (C, A, L) {
      let p = function (a, ar) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // 🔧 Inicializaciones (namespaces EXACTOS a los del data-cal-namespace)

    // Batería
    window.Cal("init", "bateria", { origin: "https://app.cal.com" });
    window.Cal.ns.bateria("ui", {
      layout: "month_view",
    });

    // Aceite
    window.Cal("init", "servicio-de-cambio-de-aceite-o-filtro", {
      origin: "https://app.cal.com",
    });
    window.Cal.ns["servicio-de-cambio-de-aceite-o-filtro"]("ui", {
      layout: "month_view",
    });

    // Frenos
    window.Cal("init", "servicio-de-mantenimiento-de-frenos", {
      origin: "https://app.cal.com",
    });
    window.Cal.ns["servicio-de-mantenimiento-de-frenos"]("ui", {
      layout: "month_view",
    });

  }, []);

  return (
    <div
      id="turnos"
      className="scroll-mt-32 flex flex-col md:flex-row gap-4 justify-center mt-6"
    >
      {/* Batería */}
      <button
        data-cal-link="servigo-zona-norte/bateria"
        data-cal-namespace="bateria"
        data-cal-config='{"layout":"month_view"}'
        className="bg-[#f29101] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-[#d88000] hover:scale-105"
      >
        Batería
      </button>

      {/* Cambio de aceite */}
      <button
        data-cal-link="servigo-zona-norte/servicio-de-cambio-de-aceite-o-filtro"
        data-cal-namespace="servicio-de-cambio-de-aceite-o-filtro"
        data-cal-config='{"layout":"month_view"}'
        className="bg-[#f29101] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-[#d88000] hover:scale-105"
      >
        Cambio de aceite
      </button>

      {/* Frenos */}
      <button
        data-cal-link="servigo-zona-norte/servicio-de-mantenimiento-de-frenos"
        data-cal-namespace="servicio-de-mantenimiento-de-frenos"
        data-cal-config='{"layout":"month_view"}'
        className="bg-[#f29101] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-[#d88000] hover:scale-105"
      >
        Frenos
      </button>

      {/* Otros */}
      <a
        href="https://wa.me/5491132033363?text=Hola%20ServiGo,%20quiero%20consultar%20por%20otros%20servicios"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#f29101] text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:bg-[#d88000] hover:scale-105"
      >
        Otros turnos
      </a>
    </div>
  );
}