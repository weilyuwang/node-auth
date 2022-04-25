import express from "express";
import session, { Store } from "express-session"; // node.js session middleware
import { SESSION_OPTIONS } from "./config";
import { register } from "./routes";

// Declaration merging on express-session
declare module "express-session" {
    export interface SessionData {
        userId: string | undefined;
    }
}

export const createApp = (store: Store) => {
    const app = express();

    app.use(express.json());

    // express session middleware
    app.use(
        session({
            ...SESSION_OPTIONS,
            store: store,
        })
    );

    // register routes
    app.use(register);

    return app;
};
