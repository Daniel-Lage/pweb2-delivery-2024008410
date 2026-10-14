import { prisma } from "../lib/prisma.js";
import type { DriverCreatePayload } from "../dto/drivers.dto.js";
import { DriverStatus } from "../models/drivers.model.js";
import type { IDriversRepository } from "./drivers.repository.interface.js";

export class DriversPrismaRepository implements IDriversRepository {
  async list() {
    const drivers = await prisma.driver.findMany();
    return drivers;
  }

  async read(id: number) {
    const driver = await prisma.driver.findUnique({
      where: { id },
    });
    return driver;
  }

  async readByCpf(cpf: string) {
    const driver = await prisma.driver.findFirst({
      where: { cpf },
    });
    return driver;
  }

  async create(payload: DriverCreatePayload) {
    const driver = await prisma.driver.create({
      data: {
        ...payload,
        status: DriverStatus.ATIVO as DriverStatus,
      },
    });
    return driver;
  }
}
