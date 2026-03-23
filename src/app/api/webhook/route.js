// src/app/api/webhook/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Webhook recibido:", body);

    if (body?.type !== "payment" || !body?.data?.id) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const paymentId = body.data.id;

    const mpRes = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!mpRes.ok) {
      const txt = await mpRes.text();
      console.error("Error consultando pago en MP:", txt);
      return NextResponse.json(
        { error: "No se pudo consultar el pago en Mercado Pago" },
        { status: 500 }
      );
    }

    const payment = await mpRes.json();
    console.log("Payment info:", payment);

    const status = payment?.status;
    const metadata = payment?.metadata || {};
    const uid = metadata?.uid;

    console.log("paymentId:", paymentId);
    console.log("status:", status);
    console.log("uid:", uid);

    if (!uid) {
      console.warn("El pago no trae metadata.uid");
      return NextResponse.json({ ok: true, warning: "missing_uid" });
    }

    if (status === "approved") {
      console.log("Pago aprobado para uid:", uid);

      // TODO:
      // 1. marcar reserva como paid/approved en Redis o DB
      // 2. guardar paymentId
      // 3. evitar cancelación por cron
      // 4. opcional: enviar mail / redirigir UI por consulta posterior
    } else if (status === "pending" || status === "in_process") {
      console.log("Pago pendiente para uid:", uid);

      // TODO:
      // marcar reserva como pending_payment
    } else if (status === "rejected" || status === "cancelled") {
      console.log("Pago rechazado/cancelado para uid:", uid);

      // TODO:
      // marcar reserva como rejected
      // luego el cron o una lógica inmediata la cancela en calendario
    } else {
      console.log("Estado no manejado aún:", status, "uid:", uid);

      // TODO:
      // registrar estado para depuración
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en webhook:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}