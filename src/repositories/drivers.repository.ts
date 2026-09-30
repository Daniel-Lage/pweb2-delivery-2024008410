import type { Database, Table } from "../database/database.js";
import type { DriverCreatePayload } from "../dto/drivers.dto.js";
import { DriverStatus, type Driver } from "../models/drivers.model.js";

export class DriversRepository {
  private table: Table<Driver>;

  constructor(database: Database) {
    this.table = database.getTable<Driver>("drivers");
  }

  async list() {
    return this.table.list();
  }

  async read(id: number) {
    const driver = this.table.find((driver) => driver.id === id);

    if (!driver) {
      return null;
    }

    return driver;
  }

  async readBy(cpf: string) {
    const driver = this.table.find((driver) => driver.cpf === cpf);

    if (!driver) {
      return null;
    }

    return driver;
  }

  async create(payload: DriverCreatePayload) {
    const newDriver = {
      ...payload,
      status: DriverStatus.ATIVO,
    };

    return this.table.push(newDriver);
  }

  async update(id: number, changes: Partial<Omit<Driver, "id">>) {}

  async delete(id: number) {
    const index = this.table.findIndex((driver) => driver.id === id);

    if (index === -1) {
      return false;
    }

    this.table.splice(index, 1);

    return true;
  }
}
