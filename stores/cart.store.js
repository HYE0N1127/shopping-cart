import { CART_STORAGE_KEY } from "../constants/storage.js";
import { CartRepository } from "../repositories/cart.repository.js";
import { LocalStorage } from "../storage/local.storage.js";
import { State } from "../utils/state.js";

class CartStore {
  #repository = new CartRepository(new LocalStorage(CART_STORAGE_KEY));
  // getAll을 fetch로 받아오는 방식으로 변경하기

  state = new State({
    cartItems: [],
  });

  constructor() {
    this.#persistState();
  }

  getState() {
    return this.state.value;
  }

  setQuantity(id, quantity) {
    if (quantity < 1) {
      return;
    }

    const state = this.getState();

    const newCartItems = state.cartItems.map((cartItem) => {
      if (cartItem.product.item_no === id) {
        return {
          ...cartItem,
          quantity: quantity,
        };
      }

      return cartItem;
    });

    this.state.value = { ...state, cartItems: newCartItems };
  }

  setSelected(id, selected) {
    const state = this.getState();
    const newCartItems = state.cartItems.map((cartItem) => {
      if (cartItem.product.item_no === id) {
        return {
          ...cartItem,
          selected: selected,
        };
      }

      return cartItem;
    });

    this.state.value = { ...state, cartItems: newCartItems };
  }

  setSelectedAll(selected) {
    const state = this.getState();

    const update = state.cartItems.map((cartItem) => ({
      ...cartItem,
      selected,
    }));

    this.state.value = { ...state, cartItems: update };
  }

  addItem(product) {
    const cartItem = {
      product,
      quantity: 1,
      selected: true,
    };

    const state = this.getState();

    this.state.value = { ...state, cartItems: [...state.cartItems, cartItem] };
  }

  removeItem(itemNo) {
    const state = this.getState();

    const filtered = state.cartItems.filter(
      (item) => item.product.item_no !== itemNo
    );

    this.state.value = { ...state, cartItems: filtered };
  }

  fetch() {
    const state = this.getState();

    const cartItems = this.#repository.getAll();

    this.state.value = { ...state, cartItems };
  }

  #persistState() {
    this.state.subscribe(() => {
      this.#repository.save(this.state.value.cartItems);
    });
  }
}

export const cartStore = new CartStore();
