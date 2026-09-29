import type { DeliveryStatus } from "../models/deliveries.model.js";

export type DeliveryCreatePayload = {
  descricao: string;
  origem: string;
  destino: string;
};

export type DeliveryUpdatePayload = {
  descricao?: string;
  origem?: string;
  destino?: string;
  status?: DeliveryStatus;
  historico?: { data: string; descricao: string }[];
};
