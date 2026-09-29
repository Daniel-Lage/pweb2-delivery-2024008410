import type { Database, Table } from "../database/database.js";
import type { DeliveryCreatePayload } from "../dto/deliveries.dto.js";
import { type Delivery, DeliveryStatus } from "../models/deliveries.model.js";

export class DeliveriesRepository {
  private table: Table<Delivery>;

  constructor(database: Database) {
    this.table = database.getTable<Delivery>("deliveries");
  }

  async list(status?: DeliveryStatus) {
    return this.table.list((delivery) => {
      if (status) {
        return delivery.status === status;
      }
      return true;
    });
  }

  async read(id: number) {
    const delivery = this.table.find((delivery) => delivery.id === id);

    if (!delivery) {
      return null;
    }

    return delivery;
  }

  async readBy(filters: (delivery: Delivery) => boolean) {
    const delivery = this.table.find(filters);

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

    return this.table.push(newDelivery);
  }

  async update(id: number, changes: Partial<DeliveryCreatePayload>) {
    const index = this.table.findIndex((delivery) => delivery.id === id);
    const delivery = this.table.get(index);

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

    return this.table.put(index, finalDelivery);
  }

  async delete(id: number) {
    const index = this.table.findIndex((delivery) => delivery.id === id);

    if (index === -1) {
      return false;
    }

    this.table.splice(index, 1);

    return true;
  }
}
