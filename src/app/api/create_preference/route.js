import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

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
    payer: {
      email: body.email,
    },
    metadata: {
      eventId: body.eventId,
      email: body.email,
      date: body.date,
      time: body.time,
    },
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pending",
    },
  },
});
console.log("PREFERENCE:", preference);

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
    });

  } catch (error) {
    console.error("Error MP:", error);

    return NextResponse.json(
      { error: "Error creando preferencia" },
      { status: 500 }
    );
  }
}