import { redis } from "@/lib/redis";

export async function saveBooking(booking) {
  const key = `booking:${booking.uid}`;

  await redis.set(key, booking);

  return booking;
}

export async function getBooking(uid) {
  return await redis.get(`booking:${uid}`);
}

export async function updateBooking(uid, updates) {
  const key = `booking:${uid}`;

  const current = await redis.get(key);

  if (!current) return null;

  const updated = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await redis.set(key, updated);

  return updated;
}