export enum DeliveryStatus {
  CRIADA = "CRIADA",
  EM_TRANSITO = "EM_TRANSITO",
  ENTREGUE = "ENTREGUE",
  CANCELADA = "CANCELADA",
}

export type Delivery = {
  id: number;
  descricao: string;
  origem: string;
  destino: string;
  status: DeliveryStatus;
  historico: { data: string; descricao: string }[];
};
