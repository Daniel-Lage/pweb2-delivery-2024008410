export enum DriverStatus {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
}

export type Driver = {
  id: number;
  nome: string;
  cpf: string;
  placaVeiculo?: string;
  status: DriverStatus;
};
