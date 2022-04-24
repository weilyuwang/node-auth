import mongoose from "mongoose";
import Redis from "ioredis"; // A robust, performance-focused and full-featured Redis client for Node.js.
import session from "express-session"; // node.js session middleware
import connectRedis from "connect-redis"; // connect-redis provides Redis session storage for Express
import { REDIS_OPTIONS, APP_PORT, MONGO_URI, MONGO_OPTIONS } from "./config";
import { createApp } from "./app";

(async () => {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

    const RedisSessionStore = connectRedis(session);

    const redisClient = new Redis(REDIS_OPTIONS);

    const store = new RedisSessionStore({ client: redisClient });

    const app = createApp(store);

    app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
})();
