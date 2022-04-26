import { SessionOptions } from "express-session";
import { IN_PROD } from "./app";

const ONE_HOUR = 1000 * 60 * 60;
const TEN_MINUTES = ONE_HOUR / 6;
const SIX_HOURS = ONE_HOUR * 6;

export const {
    SESSION_SECRET = `please keep this secret, mate`,
    SESSION_NAME = "sid",
    SESSION_IDLE_TIMEOUT = TEN_MINUTES,
} = process.env;

export const SESSION_ABSOLUTE_TIMEOUT = +(
    process.env.SESSION_ABSOLUTE_TIMEOUT || SIX_HOURS
);

export const SESSION_OPTIONS: SessionOptions = {
    secret: SESSION_SECRET,
    name: SESSION_NAME,
    cookie: {
        maxAge: +SESSION_IDLE_TIMEOUT,
        secure: IN_PROD,
        sameSite: true,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
};

// Declaration merging on express-session
declare module "express-session" {
    export interface SessionData {
        userId: string;
        createdAt: number;
    }
}
