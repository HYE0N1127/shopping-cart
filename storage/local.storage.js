export class Storage {
  #key;
  #storage;

  constructor(key, storage) {
    this.#key = key;
    this.#storage = storage;
  }

  get storage() {
    return this.#storage;
  }

  get key() {
    return this.#key;
  }
}

export class LocalStorage extends Storage {
  constructor(key) {
    super(key, localStorage);
  }

  setItem(items) {
    this.storage.setItem(this.key, JSON.stringify(items));
  }

  getAll() {
    const item = localStorage.getItem(this.key) || "[]";
    return this.#parse(item);
  }

  #parse(itemString) {
    try {
      return JSON.parse(itemString || "[]");
    } catch {
      console.log("failed to get, return empty array");
      return [];
    }
  }
}
