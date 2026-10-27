import type { Request, Response } from "express";
import type { DriversService } from "../services/drivers.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { DriverCreatePayload } from "../dto/drivers.dto.js";

export class DriversViewsController {
  constructor(private driversService: DriversService) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const payload: DriverCreatePayload = req.body;

    const newDriver = await this.driversService.create(payload);

    res.redirect("/motoristas/" + newDriver.id);
  });

  list = asyncHandler(async (req: Request, res: Response) => {
    const drivers = await this.driversService.list();

    res.render("drivers/list", { drivers });
  });

  form = asyncHandler(async (req: Request, res: Response) => {
    res.render("drivers/form");
  });

  read = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const driver = await this.driversService.read(Number(id));

    const deliveries = await this.driversService.listDeliveries(driver.id);

    res.render("drivers/read", { driver, deliveries });
  });
}
