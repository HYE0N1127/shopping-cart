import { CART_STORAGE_KEY } from "../constants/storage.js";

// storage 객체를 주입받을 수 있는 방식으로 변경시키기
// new CartRepository(new LocalStorage())

export class CartRepository {
  #storage;

  constructor(storage) {
    this.#storage = storage;
  }

  save(cartItems) {
    this.#storage.setItem(CART_STORAGE_KEY, cartItems);
  }

  getAll() {
    return this.#storage.getAll(CART_STORAGE_KEY);
  }
}
