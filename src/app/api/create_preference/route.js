import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

// 🔐 Configuración correcta (SDK nuevo)
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: body.title,
            quantity: 1,
            currency_id: "ARS",
            unit_price: Number(body.price),
          },
        ],
        metadata: {
          email: body.email,
          date: body.date,
          time: body.time,
          eventId: body.eventId,
        },
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
        // auto_return: "approved",
      },
    });

    return NextResponse.json({
      id: response.id,
    });

  } catch (error) {
    console.error("Error MP:", error);

    return NextResponse.json(
      { error: "Error creando preferencia" },
      { status: 500 }
    );
  }
}