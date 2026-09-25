import { AppError } from "../utils/AppError.js";

export class DeliveriesService {
  constructor(deliveriesRepository) {
    this.deliveriesRepository = deliveriesRepository;
  }

  async list() {
    return await this.deliveriesRepository.list();
  }

  async read(id) {
    const delivery = await this.deliveriesRepository.read(id);

    if (!delivery) {
      throw new AppError("Entrega não foi encontrada", 404);
    }

    return delivery;
  }

  async create(payload) {
    if (payload.origem === payload.destino) {
      throw new AppError("Origem e destino não podem ser iguais", 400);
    }

    const deliveryPrevia = await this.deliveriesRepository.readByFilter(
      (delivery) =>
        delivery.descricao === payload.descricao &&
        delivery.origem === payload.origem &&
        delivery.destino === payload.destino &&
        delivery.status !== "ENTREGUE" &&
        delivery.status !== "CANCELADA",
    );

    if (deliveryPrevia) {
      console.log("Entrega duplicada encontrada:", deliveryPrevia);

      throw new AppError("Proibido criar entrega ativa duplicada", 409);
    }

    return await this.deliveriesRepository.create(payload);
  }

  async update(id, changes) {
    await this.read(id);

    return await this.deliveriesRepository.update(id, changes);
  }

  async delete(id) {
    await this.read(id);

    return await this.deliveriesRepository.delete(id);
  }
}
