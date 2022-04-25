import { NextFunction, Request, RequestHandler, Response } from "express";

// use 'any' instead of 'RequestHandler' as the type of handler is to depress error
export const catchAsync =
    (handler: any) => (req: Request, res: Response, next: NextFunction) =>
        handler(req, res, next).catch(next);

/* or can do below with try catch */

// export const catchAsync =
//     (handler: RequestHandler) =>
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             await handler(req, res, next);
//         } catch (err) {
//             next(err);
//         }
//     };

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
