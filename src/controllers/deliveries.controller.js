import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export class DeliveriesController {
  constructor(deliveriesService) {
    this.deliveriesService = deliveriesService;
  }

  create = asyncHandler(async (req, res) => {
    const { descricao, origem, destino } = req.body;

    const newDelivery = await this.deliveriesService.create({
      descricao,
      origem,
      destino,
    });

    res.status(201).json(newDelivery);
  });

  list = asyncHandler(async (req, res) => {
    const deliveries = await this.deliveriesService.list();

    if (req.query.status) {
      const filteredDeliveries = deliveries.filter(
        (delivery) => delivery.status === req.query.status,
      );

      return res.json(filteredDeliveries);
    }

    res.json(deliveries);
  });

  read = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    res.json(delivery);
  });

  advance = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    if (delivery.status === "CRIADA") {
      const updatedDelivery = await this.deliveriesService.update(Number(id), {
        status: "EM_TRANSITO",
        historico: [
          ...delivery.historico,
          { data: new Date().toISOString(), descricao: "Despacho" },
        ],
      });

      return res.json(updatedDelivery);
    }

    if (delivery.status === "EM_TRANSITO") {
      const updatedDelivery = await this.deliveriesService.update(Number(id), {
        status: "ENTREGUE",
        historico: [
          ...delivery.historico,
          { data: new Date().toISOString(), descricao: "Entrega" },
        ],
      });

      return res.json(updatedDelivery);
    }

    throw new AppError("Entrega já foi finalizada", 422);
  });

  cancel = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    if (delivery.status === "ENTREGUE" || delivery.status === "CANCELADA") {
      throw new AppError("Entrega já foi finalizada", 422);
    }

    const updatedDelivery = await this.deliveriesService.update(Number(id), {
      status: "CANCELADA",
      historico: [
        ...delivery.historico,
        { data: new Date().toISOString(), descricao: "Cancelamento" },
      ],
    });
    res.json(updatedDelivery);
  });

  listHistory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const delivery = await this.deliveriesService.read(Number(id));

    res.json(delivery.historico);
  });
}
