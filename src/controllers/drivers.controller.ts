import type { Request, Response } from "express";
import type { DriversService } from "../services/drivers.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { DriverCreatePayload } from "../dto/drivers.dto.js";
import type { DeliveryStatus } from "../models/deliveries.model.js";

export class DriversController {
  constructor(private driversService: DriversService) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const payload: DriverCreatePayload = req.body;

    const newDriver = await this.driversService.create(payload);

    res.status(201).json(newDriver);
  });

  list = asyncHandler(async (req: Request, res: Response) => {
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
    const { status }: { status?: DeliveryStatus } = req.query;

    const driver = await this.driversService.read(Number(id));

    const deliveries = await this.driversService.listDeliveries(
      driver.id,
      status,
    );

    res.json(deliveries);
  });
}
