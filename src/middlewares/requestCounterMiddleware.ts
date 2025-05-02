import { NextFunction, Request, Response } from "express";
import promClient from "prom-client";

export const requestCounterMiddleware = (requestCounter: promClient.Counter) => (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
        const method = req.method;
        const statusCode = res.statusCode;

        requestCounter.inc({ method: method, status: statusCode })
    });

    next();
}