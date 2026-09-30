import type { DeliveryCreatePayload } from "../dto/deliveries.dto.js";
import { DeliveryStatus } from "../models/deliveries.model.js";
import { DriverStatus } from "../models/drivers.model.js";

import type { IDeliveriesRepository } from "../repositories/deliveries.repository.js";
import type { IDriversRepository } from "../repositories/drivers.repository.js";
import { AppError } from "../utils/AppError.js";

export class DeliveriesService {
  constructor(
    private deliveriesRepository: IDeliveriesRepository,
    private driversRepository: IDriversRepository,
  ) {}

  async create(payload: DeliveryCreatePayload) {
    if (payload.origem === payload.destino) {
      throw new AppError("Origem e destino não podem ser iguais", 400);
    }

    const deliveryCadastrada = await this.deliveriesRepository.readByAttributes(
      payload.descricao,
      payload.origem,
      payload.destino,
    );

    if (deliveryCadastrada) {
      throw new AppError("Proibido criar entrega ativa duplicada", 409);
    }

    return await this.deliveriesRepository.create(payload);
  }

  async list(status?: DeliveryStatus) {
    return await this.deliveriesRepository.list(status);
  }

  async read(id: number) {
    const delivery = await this.deliveriesRepository.read(id);

    if (!delivery) {
      throw new AppError("Entrega não foi encontrada", 404);
    }

    return delivery;
  }

  async advance(id: number) {
    const delivery = await this.read(id);

    if (delivery.status === DeliveryStatus.CRIADA) {
      const updatedDelivery = await this.deliveriesRepository.update(
        Number(id),
        {
          status: DeliveryStatus.EM_TRANSITO,
          historico: [
            ...delivery.historico,
            { data: new Date().toISOString(), descricao: "Despacho" },
          ],
        },
      );

      return updatedDelivery;
    }

    if (delivery.status === DeliveryStatus.EM_TRANSITO) {
      const updatedDelivery = await this.deliveriesRepository.update(
        Number(id),
        {
          status: DeliveryStatus.ENTREGUE,
          historico: [
            ...delivery.historico,
            { data: new Date().toISOString(), descricao: "Entrega" },
          ],
        },
      );

      return updatedDelivery;
    }

    throw new AppError("Entrega já foi finalizada", 422);
  }

  async cancel(id: number) {
    const delivery = await this.read(Number(id));

    if (
      delivery.status === DeliveryStatus.ENTREGUE ||
      delivery.status === DeliveryStatus.CANCELADA
    ) {
      throw new AppError("Entrega já foi finalizada", 422);
    }

    const updatedDelivery = await this.deliveriesRepository.update(Number(id), {
      status: DeliveryStatus.CANCELADA,
      historico: [
        ...delivery.historico,
        { data: new Date().toISOString(), descricao: "Cancelamento" },
      ],
    });

    return updatedDelivery;
  }

  async assign(id: number, motoristaId: number) {
    const delivery = await this.read(Number(id));
    const driver = await this.driversRepository.read(Number(motoristaId));

    if (!driver) {
      throw new AppError("Motorista não foi encontrado", 404);
    }

    if (driver.status !== DriverStatus.ATIVO) {
      throw new AppError("Motorista não está ativo", 422);
    }

    if (delivery.status !== DeliveryStatus.CRIADA) {
      throw new AppError("Entrega não pode ser atribuída", 422);
    }

    const updatedDelivery = await this.deliveriesRepository.update(Number(id), {
      motoristaId: Number(motoristaId),
      historico: [
        ...delivery.historico,
        { data: new Date().toISOString(), descricao: "Atribuicao" },
      ],
    });

    return updatedDelivery;
  }
}
