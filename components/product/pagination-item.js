import { productStore } from "../../stores/product.store.js";
import { Component } from "../component.js";

export class PaginationItemComponent extends Component {
  constructor(page, current) {
    super(`<button class="product-navigation__button"></button>`);

    this.#bind(page, current);
  }

  #bind(page, current) {
    const buttonEl = this.element;

    const isCurrent = page === current;

    buttonEl.setAttribute("data-selected", `${isCurrent}`);
    buttonEl.textContent = page;

    buttonEl.onclick = () => {
      productStore.setPage(page);
      productStore.fetch();
    };
  }
}
