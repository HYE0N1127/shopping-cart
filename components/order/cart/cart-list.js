import { cartStore } from "../../../stores/cart.store.js";
import { RepaintableComponent } from "../../component.js";

export class CartListComponent extends RepaintableComponent {
  #cartItemConstructor;

  constructor(cartItemConstructor) {
    super(`<ul class="cart-list"></ul>`);

    this.#cartItemConstructor = cartItemConstructor;

    cartStore.state.subscribe(() => this.#bind());

    this.#bind();
  }

  #bind() {
    this.cleanup();

    const { cartItems } = cartStore.getState();

    cartItems.forEach((cartItem) => {
      const item = new this.#cartItemConstructor(cartItem);

      item.attachTo(this.element);
    });
  }
}
