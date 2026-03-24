import { NextResponse } from "next/server";
import { getBooking } from "@/lib/bookings";

export async function GET(req, context) {
  try {
    const { uid } = await context.params;

    console.log("UID recibido en route [uid]:", uid);

    if (!uid) {
      return NextResponse.json(
        { error: "UID no recibido en la ruta" },
        { status: 400 }
      );
    }

    const booking = await getBooking(uid);

    if (!booking) {
      return NextResponse.json(
        { error: "Reserva no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      booking,
    });
  } catch (error) {
    console.error("Error obteniendo booking:", error);

    return NextResponse.json(
      {
        error: "Error obteniendo reserva",
        detail: error?.message || "Error desconocido",
      },
      { status: 500 }
    );
  }
}