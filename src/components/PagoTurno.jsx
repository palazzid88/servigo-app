"use client";

import { useSearchParams } from "next/navigation";

export default function PagoTurno() {
  const params = useSearchParams();

  const email = params.get("email");
  const date = params.get("date");
  const time = params.get("time");
  const eventId = params.get("eventId");

  const handlePagar = async () => {
    const res = await fetch("/api/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Seña reserva turno ServiGO",
        price: 3000,
        email,
        date,
        time,
        eventId,
      }),
    });

    const data = await res.json();

    window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${data.id}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-8 text-center">
        
        <h1 className="text-2xl font-bold mb-4">
          Confirmá tu turno
        </h1>

        <p className="text-gray-700 mb-4">
          Para confirmar tu turno necesitamos una <strong>seña</strong>.
        </p>

        <p className="text-gray-600 mb-2 text-sm">
          📅 Fecha: {date}
        </p>

        <p className="text-gray-600 mb-4 text-sm">
          ⏰ Hora: {time}
        </p>

        <p className="text-gray-600 mb-6 text-sm">
          ⚠️ La seña corresponde únicamente a la reserva del turno.
          El costo final será definido por el taller luego de revisar el vehículo.
        </p>

        <button
          onClick={handlePagar}
          className="bg-[#f29101] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#d88000] transition"
        >
          Pagar seña
        </button>

      </div>
    </div>
  );
}