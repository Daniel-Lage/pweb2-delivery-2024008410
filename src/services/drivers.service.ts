import type { DriverCreatePayload } from "../dto/drivers.dto.js";
import type { DeliveryStatus } from "../models/deliveries.model.js";
import type { IDeliveriesRepository } from "../repositories/deliveries.repository.interface.js";
import type { IDriversRepository } from "../repositories/drivers.repository.interface.js";
import { AppError } from "../utils/AppError.js";

export class DriversService {
  constructor(
    private driversRepository: IDriversRepository,
    private deliveriesRepository: IDeliveriesRepository,
  ) {}

  async create(payload: DriverCreatePayload) {
    const driverCadastrado = await this.driversRepository.readByCpf(
      payload.cpf,
    );

    if (driverCadastrado) {
      throw new AppError("Proibido criar motorista duplicado", 409);
    }

    return await this.driversRepository.create(payload);
  }

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

  async listDeliveries(motoristaId: number, status?: DeliveryStatus) {
    return await this.deliveriesRepository.listByDriverId(motoristaId, status);
  }
}
