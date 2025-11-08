import { CART_STORAGE_KEY } from "../constants/storage.js";

export class CartRepository {
  #storage;

  constructor(storage) {
    this.#storage = storage;
  }

  save(cartItems) {
    this.#storage.set(CART_STORAGE_KEY, cartItems);
  }

  getAll() {
    const { cartItems } = this.#storage.get(CART_STORAGE_KEY, {
      cartItems: [],
    });

    return cartItems;
  }
}
