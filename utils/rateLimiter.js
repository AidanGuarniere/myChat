import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL); // replace with your Redis connection string

const WINDOW_TIME = 60; // window time frame in seconds
const MAX_REQUESTS = 50; // maximum requests per user per window time frame

export default async function rateLimiter(req, res) {
  const userIp = req.headers['x-real-ip'] || req.connection.remoteAddress;

  // increment the count for the user's IP address and set the expiration to the window time
  const newCount = await redis.incr(userIp);
  if (newCount === 1) {
    await redis.expire(userIp, WINDOW_TIME);
  }

  if (newCount > MAX_REQUESTS) {
    throw new Error('Too many requests');
  }
}
