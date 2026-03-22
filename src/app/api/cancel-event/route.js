import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json({ error: "eventId requerido" }, { status: 400 });
    }

    // 🔴 Aquí deberías tener acceso a Google Calendar API
    // Este es un ejemplo conceptual

    const calendarId = "primary"; // o el calendario del cliente

    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar evento");
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al cancelar evento" }, { status: 500 });
  }
}