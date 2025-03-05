import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.REDIS_ENDPOINT as unknown as string,
    token: process.env.REDIS_TOKEN as unknown as string,
})

export default redis