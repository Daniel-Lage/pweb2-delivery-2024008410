import type { DeliveryStatus } from "../models/deliveries.model.js";

export type DeliveryCreatePayload = {
  descricao: string;
  origem: string;
  destino: string;
};
