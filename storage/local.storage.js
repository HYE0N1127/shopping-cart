export class LocalStorage {
  setItem(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  }

  getAll(key) {
    const item = localStorage.getItem(key) || "[]";
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
