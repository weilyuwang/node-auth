import express from "express";
import session, { Store } from "express-session"; // node.js session middleware
import { SESSION_OPTIONS } from "./config";

export const createApp = (store: Store) => {
    const app = express();

    app.use(
        session({
            ...SESSION_OPTIONS,
            store: store,
        })
    );

    app.get("/", (req, res) => res.json({ message: "Works" }));

    return app;
};
