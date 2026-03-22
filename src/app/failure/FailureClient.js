"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function FailureClient() {
  const params = useSearchParams();
  const router = useRouter();

  const email = params.get("email");
  const date = params.get("date");
  const time = params.get("time");
  const eventId = params.get("eventId");

  const handleRetry = () => {
    router.push(
      `/pago-turno?email=${email}&date=${date}&time=${time}&eventId=${eventId}`
    );
  };

  const handleCancel = async () => {
    try {
      await fetch("/api/cancel-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      });

      alert("Turno cancelado correctamente");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error al cancelar turno");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>❌ El pago no pudo completarse</h1>

      <p>Puedes intentar nuevamente o cancelar el turno.</p>

      <hr />

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleRetry}>
          🔁 Volver a pagar
        </button>

        <button onClick={handleCancel} style={{ marginLeft: "1rem" }}>
          ❌ Cancelar turno
        </button>
      </div>
    </div>
  );
}