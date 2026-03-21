import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Webhook recibido:", body);

    // Mercado Pago manda distintos tipos de notificaciones
    if (body.type === "payment") {
      const paymentId = body.data.id;

      // Consultamos el pago real a MP (clave 🔥)
      const payment = await mercadopago.payment.findById(paymentId);

      const status = payment.body.status;

      console.log("Estado del pago:", status);

      if (status === "approved") {
        // 👉 ACÁ confirmás en tu DB
        console.log("✅ Pago aprobado");

      } else if (status === "pending") {
        console.log("⏳ Pago pendiente");

      } else if (status === "rejected") {
        console.log("❌ Pago rechazado");
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Error en webhook:", error);

    return NextResponse.json(
      { error: "Error en webhook" },
      { status: 500 }
    );
  }
}