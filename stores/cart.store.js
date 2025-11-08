import { CartRepository } from "../repositories/cart.repository.js";
import { State } from "../utils/state.js";
import { LocalStorage } from "../utils/storage/local-storage.js";

class CartStore {
  #repository = new CartRepository(new LocalStorage());
  // getAll을 fetch로 받아오는 방식으로 변경하기

  state = new State({
    cartItems: [],
  });

  getState() {
    return this.state.value;
  }

  #update(value) {
    this.state.value = value;
    this.#repository.save(value);
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

    this.#update({ ...state, cartItems: newCartItems });
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

    this.#update({ ...state, cartItems: newCartItems });
  }

  setSelectedAll(selected) {
    const state = this.getState();

    const update = state.cartItems.map((cartItem) => ({
      ...cartItem,
      selected,
    }));

    this.#update({ ...state, cartItems: update });
  }

  addItem(product) {
    const cartItem = {
      product,
      quantity: 1,
      selected: true,
    };

    const state = this.getState();

    this.#update({ ...state, cartItems: [...state.cartItems, cartItem] });
  }

  removeItem(itemNo) {
    const state = this.getState();

    const filtered = state.cartItems.filter(
      (item) => item.product.item_no !== itemNo
    );

    this.#update({ ...state, cartItems: filtered });
  }

  fetch() {
    const cartItems = this.#repository.getAll();

    this.#update({ ...this.getState(), cartItems });
  }
}

export const cartStore = new CartStore();
