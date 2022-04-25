import express, { NextFunction, Request, Response } from "express";
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

    app.use((req, res, next) => {
        res.status(404).json({ message: "Not Found" });
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ message: "Internal Server Error" });
    });

    return app;
};
