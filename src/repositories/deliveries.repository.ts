import type { Database } from "../database/database.js";
import type { DeliveryCreatePayload } from "../dto/deliveries.dto.js";
import { type Delivery, DeliveryStatus } from "../models/delivery.model.js";

export class DeliveriesRepository {
  constructor(private database: Database<Delivery>) {}

  async list() {
    return this.database.list();
  }

  async read(id: number) {
    const delivery = this.database.find((delivery) => delivery.id === id);

    if (!delivery) {
      return null;
    }

    return delivery;
  }

  async readByFilter(filtro: (delivery: Delivery) => boolean) {
    const delivery = this.database.find(filtro);

    if (!delivery) {
      return null;
    }

    return delivery;
  }

  async create(payload: DeliveryCreatePayload) {
    const newDelivery = {
      ...payload,
      status: DeliveryStatus.CRIADA,
      motoristaId: null,
      historico: [{ data: new Date().toISOString(), descricao: "Criacao" }],
    };

    return this.database.push(newDelivery);
  }

  async update(id: number, changes: Partial<DeliveryCreatePayload>) {
    const index = this.database.findIndex((delivery) => delivery.id === id);
    const delivery = this.database.get(index);

    if (!delivery) {
      return null;
    }

    const updates = Object.fromEntries(
      Object.entries(changes).filter((entry) => {
        const value = entry[1];
        return value !== undefined;
      }),
    );

    const finalDelivery = {
      ...delivery,
      ...updates,
    };

    return this.database.put(index, finalDelivery);
  }

  async delete(id: number) {
    const index = this.database.findIndex((delivery) => delivery.id === id);

    if (index === -1) {
      return false;
    }

    this.database.splice(index, 1);

    return true;
  }
}
