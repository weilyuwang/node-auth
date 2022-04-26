import express from "express";
import session, { Store } from "express-session"; // node.js session middleware
import { SESSION_OPTIONS } from "./config";
import { serverError, notFoundError } from "./middleware";
import { home, login, register } from "./routes";

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

    // home route
    app.use(home);

    // register route
    app.use(register);

    // login/logout route
    app.use(login);

    // use notFoundError middleware to handle any requests to unknown routes
    app.use(notFoundError);

    // use serverError middleware to catch any error
    app.use(serverError);

    return app;
};
