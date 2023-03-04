import { Redis } from "ioredis";
import * as dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis({
  port: 6379,
  host: "127.0.0.1",
  username: process.env.USERNAME_REDIS,
  password: process.env.PASSWORD_REDIS,
  db: 0,
  enableReadyCheck: true,
});

export { redisClient };
