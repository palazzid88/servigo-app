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
    price
},
    back_urls: {
      success: "https://servigo-app.vercel.app//success",
      failure: "https://servigo-app.vercel.app//failure",
      pending: "https://servigo-app.vercel.app//pending",
    },
  },
});
console.log("response",response);

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