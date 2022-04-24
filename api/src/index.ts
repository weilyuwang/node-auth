import mongoose from "mongoose";
import express from "express";
import Redis from "ioredis"; // A robust, performance-focused and full-featured Redis client for Node.js.
import session from "express-session"; // node.js session middleware
import connectRedis from "connect-redis"; // connect-redis provides Redis session storage for Express
import {
    REDIS_OPTIONS,
    SESSION_OPTIONS,
    APP_PORT,
    MONGO_URI,
    MONGO_OPTIONS,
} from "./config";

(async () => {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    const RedisStore = connectRedis(session);
    const redisClient = new Redis(REDIS_OPTIONS);

    const app = express();

    app.use(
        session({
            ...SESSION_OPTIONS,
            store: new RedisStore({ client: redisClient }),
        })
    );

    app.get("/", (req, res) => res.json({ message: "Works" }));

    app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`));
})();
