import { NextFunction, Request, Response } from "express";
import { isLoggedIn } from "../auth";
import { BadRequest } from "../errors";

export const guest = (req: Request, res: Response, next: NextFunction) => {
    if (isLoggedIn(req)) {
        return next(new BadRequest("You are already logged in"));
    }

    next();
};
