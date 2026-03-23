import { NextResponse } from "next/server";
import { getBooking } from "@/lib/bookings";

export async function GET(req, { params }) {
  try {
    const booking = await getBooking(params.uid);

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
      { error: "Error obteniendo reserva" },
      { status: 500 }
    );
  }
}