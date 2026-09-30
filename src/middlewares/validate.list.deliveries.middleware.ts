import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { DeliveryStatus } from "../models/deliveries.model.js";

export function validateListDeliveries(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { status } = req.query;

  if (status == null) {
    next();
    return;
  }

  if (
    typeof status !== "string" ||
    !Object.values(DeliveryStatus).includes(status as DeliveryStatus)
  ) {
    throw new AppError("Status inválido", 400);
  }

  next();
}
