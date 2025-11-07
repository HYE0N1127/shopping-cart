import { CART_STORAGE_KEY } from "../constants/storage.js";

export class CartRepository {
  save(cartItems) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }

  get() {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    } catch {
      console.log("failed to get, return empty array");
      return [];
    }
  }
}
