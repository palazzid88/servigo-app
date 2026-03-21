import { NextResponse } from "next/server";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const preference = {
      items: [
        {
          title: body.title,
          quantity: 1,
          currency_id: "ARS",
          unit_price: Number(body.price),
        },
      ],
      back_urls: {
        success: "http://localhost:3000/success",
        failure: "http://localhost:3000/failure",
        pending: "http://localhost:3000/pending",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return NextResponse.json({
      id: response.body.id,
    });

  } catch (error) {
    console.error("Error creando preferencia:", error);

    return NextResponse.json(
      { error: "Error creando preferencia" },
      { status: 500 }
    );
  }
}