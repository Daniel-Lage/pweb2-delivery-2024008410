import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export function validateAssignDrivers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { motoristaId } = req.body;

  if (!motoristaId) {
    throw new AppError("Campo 'motoristaId' é obrigatório", 400);
  }

  if (typeof motoristaId !== "number") {
    throw new AppError("Campo 'motoristaId' deve ser um número", 400);
  }

  next();
}
