import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    await redis.set("test:key", {
      mensaje: "Redis funcionando",
      fecha: new Date().toISOString(),
    });

    const data = await redis.get("test:key");

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("Error test Redis:", error);

    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}