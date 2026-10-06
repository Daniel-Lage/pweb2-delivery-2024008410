import type { DriverCreatePayload } from "../dto/drivers.dto.js";
import type { Driver } from "../models/drivers.model.js";

export type IDriversRepository = {
  list(): Promise<Driver[]>;
  read(id: number): Promise<Driver | null>;
  readByCpf(cpf: string): Promise<Driver | null>;
  create(payload: DriverCreatePayload): Promise<Driver>;
};
