import { Redis } from "ioredis";
import { promisify } from "util";

const redisClient = new Redis({
  port: 6379,
  host: "127.0.0.1",
  username: "joey",
  password: "mypassword",
  db: 0,
  enableReadyCheck: true,
});

export { redisClient };
