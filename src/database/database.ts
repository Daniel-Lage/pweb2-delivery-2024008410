export class Database<T extends { id: number }> {
  private table: T[] = [];
  private id = 0;

  list() {
    return this.table;
  }

  get(index: number) {
    return this.table[index];
  }

  find(predicate: (record: T) => boolean) {
    return this.table.find(predicate);
  }

  findIndex(predicate: (record: T) => boolean) {
    return this.table.findIndex(predicate);
  }

  push(record: Omit<T, "id">) {
    const newRecord = { ...record, id: this.id++ } as T;
    this.table.push(newRecord);
    return newRecord;
  }

  put(index: number, record: T) {
    this.table[index] = record;
    return record;
  }

  splice(index: number, count: number) {
    this.table.splice(index, count);
  }
}
