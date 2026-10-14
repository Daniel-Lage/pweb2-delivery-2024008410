export type DriverStatus = "ATIVO" | "INATIVO";
export const DriverStatus = {
  ATIVO: "ATIVO",
  INATIVO: "INATIVO",
};

export type Driver = {
  id: number;
  nome: string;
  cpf: string;
  placaVeiculo?: string | null;
  status: DriverStatus;
};
