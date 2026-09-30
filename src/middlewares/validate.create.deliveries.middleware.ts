/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export function validateCreateDeliveries(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { descricao, origem, destino } = req.body;

  if (!descricao) {
    throw new AppError("Campo 'descricao' é obrigatório", 400);
  }

  if (!origem) {
    throw new AppError("Campo 'origem' é obrigatório", 400);
  }

  if (!destino) {
    throw new AppError("Campo 'destino' é obrigatório", 400);
  }

  next();
}
