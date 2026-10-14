export type DeliveryStatus =
  | "CRIADA"
  | "EM_TRANSITO"
  | "ENTREGUE"
  | "CANCELADA";
export const DeliveryStatus = {
  CRIADA: "CRIADA",
  EM_TRANSITO: "EM_TRANSITO",
  ENTREGUE: "ENTREGUE",
  CANCELADA: "CANCELADA",
};

export type Delivery = {
  id: number;
  descricao: string;
  origem: string;
  destino: string;
  status: DeliveryStatus;
  motoristaId: number | null;
  historico: { data: string; descricao: string }[];
};
