import type { Request, Response } from "express";
import type { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveryStatus } from "../models/deliveries.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { DeliveryCreatePayload } from "../dto/deliveries.dto.js";
import type { DriversService } from "../services/drivers.service.js";

export class DeliveriesViewsController {
  constructor(
    private deliveriesService: DeliveriesService,
    private driversService: DriversService,
  ) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const payload: DeliveryCreatePayload = req.body;

    const newDelivery = await this.deliveriesService.create(payload);

    res.redirect("/entregas/" + newDelivery.id);
  });

  list = asyncHandler(async (req: Request, res: Response) => {
    const { status }: { status?: DeliveryStatus } = req.query;

    const deliveries = await this.deliveriesService.list(status);

    res.render("deliveries/list", { deliveries });
  });

  form = asyncHandler(async (req: Request, res: Response) => {
    res.render("deliveries/form");
  });

  read = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));
    const drivers = await this.driversService.list();

    res.render("deliveries/read", { delivery, drivers });
  });

  advance = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedDelivery = await this.deliveriesService.advance(Number(id));

    res.redirect("/entregas/" + updatedDelivery.id);
  });

  cancel = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedDelivery = await this.deliveriesService.cancel(Number(id));

    res.redirect("/entregas/" + updatedDelivery.id);
  });

  assign = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { motoristaId } = req.body;

    const updatedDelivery = await this.deliveriesService.assign(
      Number(id),
      Number(motoristaId),
    );

    res.redirect("/entregas/" + updatedDelivery.id);
  });
}
