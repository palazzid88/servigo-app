import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  const keys = await kv.keys("reservation:*");

  const reservations = await Promise.all(
    keys.map(async (key) => {
      const data = await kv.get(key);
      return { key, ...data };
    })
  );

  const now = Date.now();

  for (const r of reservations) {
    if (
      r.status === "pending" &&
      now - r.createdAt > 2 * 60 * 1000
    ) {
      // cancelar evento
      await fetch("https://tu-dominio.com/api/cancel-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: r.key.replace("reservation:", "") }),
      });

      // actualizar estado
      await kv.set(r.key, {
        ...r,
        status: "expired",
      });
    }
  }

  return NextResponse.json({ ok: true });
}