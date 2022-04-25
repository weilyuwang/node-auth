import { NextFunction, Request, RequestHandler, Response } from "express";

// export const catchAsync =
//     (handler: RequestHandler) =>
//     (...args: [Request, Response, NextFunction]) =>
//         handler(...args).catch(args[2]);

export const catchAsync =
    (handler: RequestHandler) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            handler(req, res, next);
        } catch (err) {
            next(err);
        }
    };
