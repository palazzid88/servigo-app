"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessClient() {
  const params = useSearchParams();

  const uid = params.get("uid");
  const paymentId = params.get("payment_id");
  const statusParam = params.get("status");

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uid) {
      setError("No se recibió el identificador de la reserva.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 6;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${uid}`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "No se pudo obtener la reserva");
        }

        if (cancelled) return;

        setBooking(data.booking);

        // Si ya está approved, terminamos
        if (data.booking?.status === "approved") {
          setLoading(false);
          return;
        }

        // Si todavía no está approved, reintentamos un poco
        attempts += 1;

        if (attempts < maxAttempts) {
          setTimeout(fetchBooking, 2000);
        } else {
          setLoading(false);
        }
      } catch (err) {
        if (cancelled) return;
        setError(err.message || "Error obteniendo la reserva");
        setLoading(false);
      }
    };

    fetchBooking();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  const formatearFechaHora = (fechaIso) => {
    if (!fechaIso) return "No informado";

    const fecha = new Date(fechaIso);

    return fecha.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            ⏳ Confirmando tu reserva
          </h1>
          <p className="text-gray-600">
            Estamos validando el pago y los datos de tu turno.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error al confirmar
          </h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No se encontró la reserva
          </h1>
          <p className="text-gray-600">
            No pudimos recuperar los datos de tu turno.
          </p>
        </div>
      </div>
    );
  }

  const aprobado = booking.status === "approved";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1
          className={`text-3xl font-bold text-center ${
            aprobado ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {aprobado ? "✅ Reserva confirmada" : "⏳ Reserva en validación"}
        </h1>

        <p className="text-center text-gray-700 mt-3">
          {aprobado
            ? "Tu pago fue aprobado y tu turno quedó confirmado correctamente."
            : "Recibimos tu operación. Estamos terminando de validar el estado del pago."}
        </p>

        <div className="my-6 border-t"></div>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Nombre:</span> {booking.attendeeName}
          </p>

          <p>
            <span className="font-semibold">Email:</span> {booking.email}
          </p>

          <p>
            <span className="font-semibold">Servicio:</span>{" "}
            {booking.eventTypeSlug || "No informado"}
          </p>

          <p>
            <span className="font-semibold">Fecha y hora:</span>{" "}
            {formatearFechaHora(booking.attendeeStartTime)}
          </p>

          <p>
            <span className="font-semibold">Ubicación:</span>{" "}
            {booking.location || "No informada"}
          </p>

          <p>
            <span className="font-semibold">Estado:</span> {booking.status}
          </p>

          {paymentId && (
            <p>
              <span className="font-semibold">Pago:</span> {paymentId}
            </p>
          )}

          {statusParam && (
            <p>
              <span className="font-semibold">Estado devuelto por Mercado Pago:</span>{" "}
              {statusParam}
            </p>
          )}
        </div>

        <div className="my-6 border-t"></div>

        <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
          <p className="font-semibold mb-1">Importante</p>
          <p>
            Si luego querés cancelar la reserva, la seña abonada no es reintegrable.
          </p>
        </div>
      </div>
    </div>
  );
}