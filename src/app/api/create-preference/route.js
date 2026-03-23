import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

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

    if (!uid || !email || !price) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para crear la preferencia" },
        { status: 400 }
      );
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: title || "Seña reserva turno ServiGO",
            quantity: 1,
            currency_id: "ARS",
            unit_price: Number(price),
          },
        ],
        payer: {
          email,
        },
        metadata: {
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
        },
        back_urls: {
          success: "https://servigo-app.vercel.app/success",
          failure: "https://servigo-app.vercel.app/failure",
          pending: "https://servigo-app.vercel.app/pending",
        },
        notification_url: "https://servigo-app.vercel.app/api/webhook",
        auto_return: "approved",
      },
    });

    console.log("response", response);

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("Error MP:", error);

    return NextResponse.json(
      {
        error: "Error creando preferencia",
        detail: error?.message || "Error desconocido",
      },
      { status: 500 }
    );
  }
}