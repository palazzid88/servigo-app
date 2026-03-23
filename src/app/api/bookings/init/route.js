import { NextResponse } from "next/server";
import { saveBooking, getBooking } from "@/lib/bookings";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      uid,
      email,
      attendeeName,
      title,
      description,
      location,
      eventTypeSlug,
      hostName,
      attendeeStartTime,
      endTime,
      price,
    } = body;

    if (!uid || !email || !attendeeName || !attendeeStartTime) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      );
    }

    const booking = {
      uid,
      status: "pending_payment",
      paymentId: null,
      email,
      attendeeName,
      title,
      description,
      location,
      eventTypeSlug,
      hostName,
      attendeeStartTime,
      endTime,
      price,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log("CREANDO BOOKING:", booking);

    await saveBooking(booking);

    console.log("BOOKING GUARDADO:", uid);

    const saved = await getBooking(uid);

    console.log("BOOKING LEÍDO DESPUÉS DE GUARDAR:", saved);

    return NextResponse.json({
      ok: true,
      booking,
      saved,
    });
  } catch (error) {
    console.error("Error init booking:", error);

    return NextResponse.json(
      {
        error: "Error creando reserva",
        detail: error?.message || "Error desconocido",
      },
      { status: 500 }
    );
  }
}