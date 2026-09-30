export type DatabaseRecord = {
  id: number;
};

export class Database {
  private static instance?: Database;
  private tables: Map<string, Table<DatabaseRecord>> = new Map();

  constructor() {
    if (Database.instance == null) {
      Database.instance = this;
    }
    return Database.instance;
  }

  getTable<T extends DatabaseRecord>(name: string) {
    const database = Database.instance ?? this;

    if (!database.tables.has(name)) {
      database.tables.set(name, new Table<T>());
    }

    return database.tables.get(name) as Table<T>;
  }
}

export class Table<T extends DatabaseRecord> {
  private data: T[] = [];
  private id = 0;

  list(filters?: (record: T) => boolean) {
    if (filters) {
      return this.data.filter(filters);
    }
    return [...this.data];
  }

  get(index: number) {
    return this.data[index];
  }

  find(predicate: (record: T) => boolean) {
    return this.data.find(predicate);
  }

  findIndex(predicate: (record: T) => boolean) {
    return this.data.findIndex(predicate);
  }

  push(record: Omit<T, "id">) {
    const newRecord = { ...record, id: this.id++ } as T;
    this.data.push(newRecord);
    return newRecord;
  }

  put(index: number, record: T) {
    this.data[index] = record;
    return record;
  }

  splice(index: number, count: number) {
    this.data.splice(index, count);
  }
}
