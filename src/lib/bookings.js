import { redis } from "@/lib/redis";

export async function saveBooking(booking) {
  const key = `booking:${booking.uid}`;

  console.log("saveBooking -> key:", key);
  console.log("saveBooking -> booking:", booking);

  await redis.set(key, booking);

  return booking;
}

export async function getBooking(uid) {
  const key = `booking:${uid}`;

  console.log("getBooking -> key:", key);

  const booking = await redis.get(key);

  console.log("getBooking -> result:", booking);

  return booking;
}

export async function updateBooking(uid, updates) {
  const key = `booking:${uid}`;

  console.log("updateBooking -> key:", key);
  console.log("updateBooking -> updates:", updates);

  const current = await redis.get(key);

  console.log("updateBooking -> current:", current);

  if (!current) return null;

  const updated = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await redis.set(key, updated);

  console.log("updateBooking -> updated:", updated);

  return updated;
}