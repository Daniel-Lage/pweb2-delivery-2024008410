/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";

export function validateCreateDrivers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { nome, cpf } = req.body;

  if (!nome) {
    throw new AppError("Campo 'nome' é obrigatório", 400);
  }

  if (!cpf) {
    throw new AppError("Campo 'cpf' é obrigatório", 400);
  }

  next();
}
