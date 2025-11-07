import { productStore } from "../../stores/product.store.js";
import { PRODUCTS_PER_REQUEST } from "../../constants/product.js";
import { RepaintableComponent } from "../component.js";

export class PaginationComponent extends RepaintableComponent {
  #paginationItemConstructor;

  constructor(paginationItemConstructor) {
    super(`<div class="product-navigation"></div>`);

    this.#paginationItemConstructor = paginationItemConstructor;

    productStore.state.subscribe(() => this.#bind());

    this.#bind();
  }

  #bind() {
    this.cleanup(this.element);

    const { totalCount, page } = productStore.getState();

    const pages = Array.from({
      length: Math.ceil(totalCount / PRODUCTS_PER_REQUEST),
    });

    pages.forEach((_, index) => {
      const item = new this.#paginationItemConstructor(index + 1, page);

      item.attachTo(this.element);
    });
  }
}
