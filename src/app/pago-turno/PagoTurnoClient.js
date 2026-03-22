"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PagoTurnoClient() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);

  const email = params.get("email");
  const date = params.get("date");
  const time = params.get("time");
  const eventId = params.get("eventId");

  const handlePago = async () => {
    try {
      setLoading(true);

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

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("Error al iniciar el pago");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Error en el pago");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* Título */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          💳 Confirmar y pagar turno
        </h1>

        {/* Detalles */}
        <div className="mt-6 space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold">Fecha:</span> {date}
          </p>
          <p>
            <span className="font-semibold">Hora:</span> {time}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t"></div>

        {/* Precio */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">
            Total a pagar
          </p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            $3000
          </p>
        </div>

        {/* Botón */}
        <button
          onClick={handlePago}
          disabled={loading}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3 rounded-lg transition"        >
          {loading ? "Redirigiendo..." : "Pagar"}
        </button>
      </div>
    </div>
  );
}