import type { Request, Response } from "express";
import type { DeliveriesService } from "../services/deliveries.service.js";
import { DeliveryStatus } from "../models/deliveries.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import type { DeliveryCreatePayload } from "../dto/deliveries.dto.js";
import type { DriversService } from "../services/drivers.service.js";
import { DriverStatus } from "../models/drivers.model.js";

export class DeliveriesController {
  constructor(
    private deliveriesService: DeliveriesService,
    private driversService: DriversService,
  ) {}

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

  assign = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { motoristaId } = req.body;

    const delivery = await this.deliveriesService.read(Number(id));
    const driver = await this.driversService.read(Number(motoristaId));

    if (driver.status !== DriverStatus.ATIVO) {
      throw new AppError("Motorista não está ativo", 422);
    }

    if (delivery.status !== DeliveryStatus.CRIADA) {
      throw new AppError("Entrega não pode ser atribuída", 422);
    }

    const updatedDelivery = await this.deliveriesService.update(Number(id), {
      motoristaId: Number(motoristaId),
      historico: [
        ...delivery.historico,
        { data: new Date().toISOString(), descricao: "Atribuicao" },
      ],
    });

    res.json(updatedDelivery);
  });
}
