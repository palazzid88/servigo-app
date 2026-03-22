"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessClient() {
  const params = useSearchParams();

  const email = params.get("email");
  const date = params.get("date");
  const time = params.get("time");
  const eventId = params.get("eventId");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>✅ Pago aprobado</h1>

      <p>Tu turno ha sido confirmado correctamente.</p>

      <hr />

      <h3>Detalle del turno:</h3>

      <ul>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Fecha:</strong> {date}</li>
        <li><strong>Hora:</strong> {time}</li>
        <li><strong>Event ID:</strong> {eventId}</li>
      </ul>
    </div>
  );
}