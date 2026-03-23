"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PagoTurnoClient() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reserva = useMemo(() => {
    const attendeeStartTime = params.get("attendeeStartTime") || "";
    const endTime = params.get("endTime") || "";

    let fecha = "";
    let hora = "";

    if (attendeeStartTime) {
      const fechaObj = new Date(attendeeStartTime);

      fecha = fechaObj.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      hora = fechaObj.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return {
      uid: params.get("uid") || "",
      email: params.get("email") || "",
      attendeeName: params.get("attendeeName") || "",
      attendeeFirstName: params.get("attendeeFirstName") || "",
      attendeeLastName: params.get("attendeeLastName") || "",
      title: params.get("title") || "Seña reserva turno ServiGO",
      description: params.get("description") || "",
      location: params.get("location") || "",
      eventTypeSlug: params.get("eventTypeSlug") || "",
      hostName: params.get("hostName") || "",
      attendeeStartTime,
      endTime,
      fecha,
      hora,
    };
  }, [params]);

  const faltanDatos =
    !reserva.uid ||
    !reserva.email ||
    !reserva.attendeeName ||
    !reserva.attendeeStartTime;

const precio = 100;

  const handlePago = async () => {
    try {
      setLoading(true);
      setError("");

            await fetch("/api/bookings/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: reserva.uid,
          email: reserva.email,
          attendeeName: reserva.attendeeName,
          title: reserva.title,
          description: reserva.description,
          location: reserva.location,
          eventTypeSlug: reserva.eventTypeSlug,
          hostName: reserva.hostName,
          attendeeStartTime: reserva.attendeeStartTime,
          endTime: reserva.endTime,
          price: precio,
        }),
      });

      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: reserva.uid,
          email: reserva.email,
          attendeeName: reserva.attendeeName,
          title: reserva.title,
          description: reserva.description,
          location: reserva.location,
          eventTypeSlug: reserva.eventTypeSlug,
          hostName: reserva.hostName,
          attendeeStartTime: reserva.attendeeStartTime,
          endTime: reserva.endTime,
          price: precio,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "No se pudo iniciar el pago");
      }

      if (data.init_point) {
        window.location.href = data.init_point;
        return;
      }

      throw new Error("Mercado Pago no devolvió una URL de pago");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error en el pago");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          💳 Confirmar y pagar turno
        </h1>

        <div className="mt-6 space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Nombre:</span> {reserva.attendeeName}
          </p>

          <p>
            <span className="font-semibold">Email:</span> {reserva.email}
          </p>

          <p>
            <span className="font-semibold">Servicio:</span> {reserva.eventTypeSlug || "No informado"}
          </p>

          <p>
            <span className="font-semibold">Fecha:</span> {reserva.fecha || "No informada"}
          </p>

          <p>
            <span className="font-semibold">Hora:</span> {reserva.hora || "No informada"}
          </p>

          {reserva.location && (
            <p>
              <span className="font-semibold">Ubicación:</span> {reserva.location}
            </p>
          )}

          <p>
            <span className="font-semibold">ID reserva:</span> {reserva.uid}
          </p>
        </div>

        <div className="my-6 border-t"></div>

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">
            Total a pagar
          </p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {precio}
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handlePago}
          disabled={loading || faltanDatos}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed active:scale-95 text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? "Redirigiendo..." : "Pagar"}
        </button>

        {faltanDatos && (
          <p className="mt-3 text-sm text-center text-red-600">
            Faltan datos obligatorios de la reserva en la URL.
          </p>
        )}
      </div>
    </div>
  );
}