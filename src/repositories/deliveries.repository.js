export class DeliveriesRepository {
  deliveries = [];
  id = 0;

  async list() {
    return this.deliveries;
  }

  async read(id) {
    const delivery = this.deliveries.find((delivery) => delivery.id === id);

    if (!delivery) {
      return null;
    }

    return delivery;
  }

  async readByDescription(descricao) {
    const delivery = this.deliveries.find(
      (delivery) => delivery.descricao === descricao,
    );

    if (!delivery) {
      return null;
    }

    return delivery;
  }

  async readByFilter(filtro) {
    const delivery = this.deliveries.find(filtro);

    if (!delivery) {
      return null;
    }

    return delivery;
  }

  async create(payload) {
    const newDelivery = {
      id: this.id++,
      ...payload,
      status: "CRIADA",
      motoristaId: null,
      historico: [{ data: new Date().toISOString(), descricao: "Criacao" }],
    };

    this.deliveries.push(newDelivery);

    return newDelivery;
  }

  async update(id, changes) {
    const index = this.deliveries.findIndex((delivery) => delivery.id === id);

    if (index === -1) {
      return null;
    }

    const delivery = this.deliveries[index];

    const updates = Object.fromEntries(
      Object.entries(changes).filter((entry) => {
        const value = entry[1];
        return value !== undefined;
      }),
    );

    const finalDelivery = {
      ...delivery,
      ...updates,
    };

    this.deliveries[index] = finalDelivery;

    return finalDelivery;
  }

  async delete(id) {
    const index = this.deliveries.findIndex((delivery) => delivery.id === id);

    if (index === -1) {
      return false;
    }

    this.deliveries.splice(index, 1);

    return true;
  }
}
