/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export function validateCreateDeliveries(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { descricao, origem, destino } = req.body;

  if (!descricao || !origem || !destino) {
    throw new AppError("Campos obrigatórios não foram preenchidos", 400);
  }

  next();
}
