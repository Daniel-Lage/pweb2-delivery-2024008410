import type { Request, Response } from "express";
import type { DriversService } from "../services/drivers.service.js";
import { DriverStatus } from "../models/drivers.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import type { DriverCreatePayload } from "../dto/drivers.dto.js";
import type { DeliveriesService } from "../services/deliveries.service.js";

export class DriversController {
  constructor(
    private driversService: DriversService,
    private deliveriesService: DeliveriesService,
  ) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const payload: DriverCreatePayload = req.body;

    const newDriver = await this.driversService.create(payload);

    res.status(201).json(newDriver);
  });

  list = asyncHandler(async (req: Request, res: Response) => {
    const { status } = req.query;

    if (status == null) {
      const drivers = await this.driversService.list();
      res.json(drivers);
      return;
    }

    if (
      typeof status !== "string" ||
      !Object.values(DriverStatus).includes(status as DriverStatus)
    ) {
      throw new AppError("Status inválido", 400);
    }

    const drivers = await this.driversService.list();

    res.json(drivers);
  });

  read = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const driver = await this.driversService.read(Number(id));

    res.json(driver);
  });

  listDeliveries = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const driver = await this.driversService.read(Number(id));

    const deliveries = await this.deliveriesService.listByDriverId(driver.id);

    res.json(deliveries);
  });
}
