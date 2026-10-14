import { prisma } from "../lib/prisma.js";
import type { DeliveryCreatePayload } from "../dto/deliveries.dto.js";
import { DeliveryStatus, type Delivery } from "../models/deliveries.model.js";
import type { IDeliveriesRepository } from "./deliveries.repository.interface.js";

export class DeliveriesPrismaRepository implements IDeliveriesRepository {
  async list(status?: DeliveryStatus) {
    const deliveries = await prisma.delivery.findMany({
      where: status ? { status } : {},
      include: { historico: true },
    });
    return deliveries;
  }

  async listByDriverId(motoristaId: number, status?: DeliveryStatus) {
    const deliveries = await prisma.delivery.findMany({
      where: { motoristaId, ...(status ? { status } : {}) },
      include: { historico: true },
    });
    return deliveries;
  }

  async read(id: number) {
    const delivery = await prisma.delivery.findUnique({
      where: { id },
      include: { historico: true },
    });
    return delivery;
  }

  async readByAttributes(descricao: string, origem: string, destino: string) {
    const delivery = await prisma.delivery.findFirst({
      where: {
        descricao,
        origem,
        destino,
        status: {
          notIn: [
            DeliveryStatus.ENTREGUE as DeliveryStatus,
            DeliveryStatus.CANCELADA as DeliveryStatus,
          ],
        },
      },
      include: { historico: true },
    });
    return delivery;
  }

  async create(payload: DeliveryCreatePayload) {
    const delivery = await prisma.delivery.create({
      data: {
        ...payload,
        status: DeliveryStatus.CRIADA as DeliveryStatus,
        historico: {
          create: {
            data: new Date().toISOString(),
            descricao: "Criacao",
          },
        },
      },
      include: { historico: true },
    });
    return delivery;
  }

  async update(id: number, changes: Partial<Omit<Delivery, "id">>) {
    const delivery = await this.read(id);

    if (!delivery) {
      return null;
    }

    const { historico, motoristaId, ...scalarChanges } = changes;
    const updatedDelivery = await prisma.delivery.update({
      where: { id },
      data: {
        ...scalarChanges,
        ...(motoristaId !== undefined ? { motoristaId } : {}),
        ...(historico
          ? {
              historico: {
                deleteMany: {},
                create: historico.map(({ data, descricao }) => ({
                  data,
                  descricao,
                })),
              },
            }
          : {}),
      },
      include: { historico: true },
    });
    return updatedDelivery;
  }
}
