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

// throw err.status and err.message, default set to be 500 and "Internal Server Error"
export const serverError = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!err.status) {
        console.error(err.stack);
    }
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });
};

export const notFoundError = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404).json({
        message: "Not Found",
    });
};
