import type { Request, Response } from "express";
import type { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveryStatus } from "../models/deliveries.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import type { DeliveryCreatePayload } from "../dto/deliveries.dto.js";

export class DeliveriesController {
  constructor(private deliveriesService: DeliveriesService) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const payload: DeliveryCreatePayload = req.body;

    const newDelivery = await this.deliveriesService.create(payload);

    res.status(201).json(newDelivery);
  });

  list = asyncHandler(async (req: Request, res: Response) => {
    const { status }: { status?: DeliveryStatus } = req.query;

    const deliveries = await this.deliveriesService.list(status);

    res.json(deliveries);
  });

  read = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    res.json(delivery);
  });

  advance = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedDelivery = await this.deliveriesService.advance(Number(id));

    res.json(updatedDelivery);
  });

  cancel = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const updatedDelivery = await this.deliveriesService.cancel(Number(id));

    res.json(updatedDelivery);
  });

  listHistory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    res.json(delivery.historico);
  });

  assign = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { motoristaId } = req.body;

    const updatedDelivery = await this.deliveriesService.assign(
      Number(id),
      Number(motoristaId),
    );

    res.json(updatedDelivery);
  });
}
