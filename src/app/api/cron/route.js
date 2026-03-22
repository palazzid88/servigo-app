export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { kv } = await import("@vercel/kv");

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
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cancel-event`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: r.key.replace("reservation:", ""),
          }),
        });

        await kv.set(r.key, {
          ...r,
          status: "expired",
        });
      }
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("CRON ERROR:", error);
    return NextResponse.json({ ok: false });
  }
}