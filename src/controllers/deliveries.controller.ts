import type { Request, Response } from "express";
import type { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveryStatus, type Delivery } from "../models/delivery.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export class DeliveriesController {
  constructor(private deliveriesService: DeliveriesService) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const { descricao, origem, destino } = req.body;

    const newDelivery = await this.deliveriesService.create({
      descricao,
      origem,
      destino,
    });

    console.log("Nova entrega criada:", newDelivery);

    res.status(201).json(newDelivery);
  });

  list = asyncHandler(async (req: Request, res: Response) => {
    const deliveries = await this.deliveriesService.list();

    if (req.query.status) {
      const filteredDeliveries = deliveries.filter(
        (delivery: Delivery) => delivery.status === req.query.status,
      );

      res.json(filteredDeliveries);
      return;
    }

    res.json(deliveries);
  });

  read = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    res.json(delivery);
  });

  advance = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    if (delivery.status === DeliveryStatus.CRIADA) {
      const updatedDelivery = await this.deliveriesService.update(Number(id), {
        status: DeliveryStatus.EM_TRANSITO,
        historico: [
          ...delivery.historico,
          { data: new Date().toISOString(), descricao: "Despacho" },
        ],
      });

      res.json(updatedDelivery);
      return;
    }

    if (delivery.status === DeliveryStatus.EM_TRANSITO) {
      const updatedDelivery = await this.deliveriesService.update(Number(id), {
        status: DeliveryStatus.ENTREGUE,
        historico: [
          ...delivery.historico,
          { data: new Date().toISOString(), descricao: "Entrega" },
        ],
      });

      res.json(updatedDelivery);
      return;
    }

    throw new AppError("Entrega já foi finalizada", 422);
  });

  cancel = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    if (
      delivery.status === DeliveryStatus.ENTREGUE ||
      delivery.status === DeliveryStatus.CANCELADA
    ) {
      throw new AppError("Entrega já foi finalizada", 422);
    }

    const updatedDelivery = await this.deliveriesService.update(Number(id), {
      status: DeliveryStatus.CANCELADA,
      historico: [
        ...delivery.historico,
        { data: new Date().toISOString(), descricao: "Cancelamento" },
      ],
    });
    res.json(updatedDelivery);
  });

  listHistory = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    res.json(delivery.historico);
  });
}
