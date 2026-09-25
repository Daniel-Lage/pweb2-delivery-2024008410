import type {
  DeliveryCreatePayload,
  DeliveryUpdatePayload,
} from "../dto/deliveries.dto.js";

import type { DeliveriesRepository } from "../repositories/deliveries.repository.js";
import { AppError } from "../utils/AppError.js";

export class DeliveriesService {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async list() {
    return await this.deliveriesRepository.list();
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

    const deliveryPrevia = await this.deliveriesRepository.readByFilter(
      (delivery) =>
        delivery.descricao === payload.descricao &&
        delivery.origem === payload.origem &&
        delivery.destino === payload.destino &&
        delivery.status !== "ENTREGUE" &&
        delivery.status !== "CANCELADA",
    );

    if (deliveryPrevia) {
      throw new AppError("Proibido criar entrega ativa duplicada", 409);
    }

    return await this.deliveriesRepository.create(payload);
  }

  async update(id: number, changes: DeliveryUpdatePayload) {
    await this.read(id);

    return await this.deliveriesRepository.update(id, changes);
  }

  async delete(id: number) {
    await this.read(id);

    return await this.deliveriesRepository.delete(id);
  }
}
