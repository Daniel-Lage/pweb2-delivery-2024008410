import type { DeliveryCreatePayload } from "../dto/deliveries.dto.js";
import type { Delivery, DeliveryStatus } from "../models/deliveries.model.js";

import type { DeliveriesRepository } from "../repositories/deliveries.repository.js";
import { AppError } from "../utils/AppError.js";

export class DeliveriesService {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async list(status?: DeliveryStatus) {
    return await this.deliveriesRepository.list(status);
  }

  async listByDriverId(motoristaId: number) {
    return await this.deliveriesRepository.listByDriverId(motoristaId);
  }

  async read(id: number) {
    const delivery = await this.deliveriesRepository.read(id);

    if (!delivery) {
      throw new AppError("Entrega não foi encontrada", 404);
    }

    return delivery;
  }

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

  async update(id: number, changes: Partial<Omit<Delivery, "id">>) {
    await this.read(id);

    return await this.deliveriesRepository.update(id, changes);
  }
}
