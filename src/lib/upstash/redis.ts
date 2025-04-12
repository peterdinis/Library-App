import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.REDIS_ENDPOINT,
  token: process.env.REDIS_TOKEN,
});

export default redis;
