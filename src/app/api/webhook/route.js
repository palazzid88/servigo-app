import { NextResponse } from "next/server";
import { updateBooking } from "@/lib/bookings";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Webhook recibido:", body);

    // Solo procesamos eventos de pago
    if (body?.type !== "payment" || !body?.data?.id) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const paymentId = body.data.id;

    // Consultar pago en Mercado Pago
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

    // 🔥 ACTUALIZAR REDIS SEGÚN ESTADO
    if (status === "approved") {
      console.log("Pago aprobado para uid:", uid);

      await updateBooking(uid, {
        status: "approved",
        paymentId: String(paymentId),
      });

      console.log("✅ Booking actualizado a APPROVED:", uid);
    }

    else if (status === "pending" || status === "in_process") {
      console.log("Pago pendiente para uid:", uid);

      await updateBooking(uid, {
        status: "pending",
        paymentId: String(paymentId),
      });

      console.log("🟡 Booking actualizado a PENDING:", uid);
    }

    else if (status === "rejected" || status === "cancelled") {
      console.log("Pago rechazado/cancelado para uid:", uid);

      await updateBooking(uid, {
        status: "rejected",
        paymentId: String(paymentId),
      });

      console.log("❌ Booking actualizado a REJECTED:", uid);
    }

    else {
      console.log("Estado no manejado aún:", status, "uid:", uid);

      await updateBooking(uid, {
        status: status,
        paymentId: String(paymentId),
      });
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Error en webhook:", error);

    return NextResponse.json(
      { error: "Webhook error" },
      { status: 500 }
    );
  }
}