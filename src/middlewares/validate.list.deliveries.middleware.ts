/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { DeliveryStatus } from "../models/deliveries.model.js";

export function validateCreateDeliveries(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { status } = req.query;

  if (status == null) {
    next();
  }

  if (
    typeof status !== "string" ||
    !Object.values(DeliveryStatus).includes(status as DeliveryStatus)
  ) {
    throw new AppError("Status inválido", 400);
  }

  next();
}
