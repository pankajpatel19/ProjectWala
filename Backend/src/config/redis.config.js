import Redis from "ioredis";

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => {
  console.log("Redis client connected successfully");
});

redisClient.on("error", (error) => {
  console.log("Redis connection error:", error);
  process.exit(1);
});
export default redisClient;
