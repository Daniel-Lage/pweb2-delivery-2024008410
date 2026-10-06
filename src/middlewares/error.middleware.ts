/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    console.error(
      `Error ${err.statusCode} ${new Date().toISOString()}: ${req.method}(${req.path}) -> "${err.message}"`,
    );

    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(
    `Undefined Error ${new Date().toISOString()}: ${req.method}(${req.path}) -> "${err.message}"`,
  );

  res.status(500).json({ error: "Internal Server Error" });
}
