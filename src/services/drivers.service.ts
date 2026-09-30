import type { DriverCreatePayload } from "../dto/drivers.dto.js";
import type { Driver, DriverStatus } from "../models/drivers.model.js";

import type { DriversRepository } from "../repositories/drivers.repository.js";
import { AppError } from "../utils/AppError.js";

export class DriversService {
  constructor(private driversRepository: DriversRepository) {}

  async list() {
    return await this.driversRepository.list();
  }

  async read(id: number) {
    const driver = await this.driversRepository.read(id);

    if (!driver) {
      throw new AppError("Motorista não foi encontrado", 404);
    }

    return driver;
  }

  async create(payload: DriverCreatePayload) {
    const driverCadastrado = await this.driversRepository.readBy(payload.cpf);

    if (driverCadastrado) {
      throw new AppError("Proibido criar motorista duplicado", 409);
    }

    return await this.driversRepository.create(payload);
  }

  async update(id: number, changes: Partial<Omit<Driver, "id">>) {
    await this.read(id);

    return await this.driversRepository.update(id, changes);
  }
}
