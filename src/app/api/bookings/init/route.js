import { NextResponse } from "next/server";
import { saveBooking } from "@/lib/bookings";

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

    await saveBooking(booking);

    return NextResponse.json({
      ok: true,
      booking,
    });
  } catch (error) {
    console.error("Error init booking:", error);

    return NextResponse.json(
      { error: "Error creando reserva" },
      { status: 500 }
    );
  }
}