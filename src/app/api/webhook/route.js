import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Webhook recibido:", body);

    // Mercado Pago envía diferentes tipos de eventos
    // Nos interesa cuando hay un pago
    if (body.type === "payment") {
      const paymentId = body.data.id;

      console.log("Payment ID:", paymentId);

      // Consultar el pago en Mercado Pago API
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );

      const payment = await response.json();

      console.log("Payment info:", payment);

      // Validar estado del pago
      if (payment.status === "approved") {
        const metadata = payment.metadata;

        const eventId = metadata?.eventId;

        console.log("Pago aprobado para eventId:", eventId);

        // 👉 Acá es donde vas a manejar tu lógica:
        // - marcar como pagado
        // - cancelar timer
        // - confirmar reserva

      } else {
        console.log("Pago no aprobado:", payment.status);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}