export class Observable {
  #listeners = new Set();

  _notify() {
    this.#listeners.forEach((listener) => listener());
  }

  subscribe = (callback) => {
    this.#listeners.add(callback);
  };

  unsubscribe = (callback) => {
    this.#listeners.delete(callback);
  };
}
