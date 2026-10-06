import type { DeliveryCreatePayload } from "../dto/deliveries.dto.js";
import type { Delivery, DeliveryStatus } from "../models/deliveries.model.js";

export type IDeliveriesRepository = {
  list(status?: DeliveryStatus): Promise<Delivery[]>;
  listByDriverId(
    motoristaId: number,
    status?: DeliveryStatus,
  ): Promise<Delivery[]>;
  read(id: number): Promise<Delivery | null>;
  readByAttributes(
    descricao: string,
    origem: string,
    destino: string,
  ): Promise<Delivery | null>;
  create(payload: DeliveryCreatePayload): Promise<Delivery>;
  update(
    id: number,
    changes: Partial<Omit<Delivery, "id">>,
  ): Promise<Delivery | null>;
};
