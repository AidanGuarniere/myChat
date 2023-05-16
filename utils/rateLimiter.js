import Redis from "ioredis";

let redis;

if (!redis) {
  redis = new Redis(process.env.REDIS_URL);
}

const WINDOW_TIME = 60;
const MAX_REQUESTS = 50;

export default async function rateLimiter(userId) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const newCount = await redis.incr(userId);
  if (newCount === 1) {
    await redis.expire(userId, WINDOW_TIME);
  }

  if (newCount > MAX_REQUESTS) {
    throw new Error("Too many requests");
  }
}
