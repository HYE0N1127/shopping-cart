import { productStore } from "../../stores/product.store.js";
import { RepaintableComponent } from "../component.js";

export class ProductsComponent extends RepaintableComponent {
  #productConstructor;

  constructor(productConstructor) {
    super(`<div class="product-wrapper"></div>`);

    this.#productConstructor = productConstructor;

    productStore.fetch();

    productStore.state.subscribe(() => this.#bind());

    this.#bind();
  }

  #bind() {
    this.cleanup();

    const { products } = productStore.getState();

    products.forEach((product) => {
      const item = new this.#productConstructor(product);

      item.attachTo(this.element);
    });
  }
}
