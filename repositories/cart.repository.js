import { CART_STORAGE_KEY } from "../constants/storage.js";

// storage 객체를 주입받을 수 있는 방식으로 변경시키기
// new CartRepository(new LocalStorage())

export class CartRepository {
  save(cartItems) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }

  getAll() {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    } catch {
      console.log("failed to get, return empty array");
      return [];
    }
  }
}
