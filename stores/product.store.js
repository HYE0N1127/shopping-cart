import { ProductRepository } from "../repositories/product.repository.js";
import { PRODUCTS_PER_REQUEST } from "../constants/product.js";
import { State } from "../utils/state.js";

class ProductStore {
  #repository = new ProductRepository();

  state = new State({
    page: 1,
    totalCount: 0,
    products: [],
  });

  getState() {
    return this.state.value;
  }

  setPage(page) {
    this.state.value = { ...this.getState(), page };
  }

  fetch() {
    const state = this.getState();

    const { products, totalCount } = this.#repository.getAll(
      state.page,
      PRODUCTS_PER_REQUEST
    );

    this.state.value = { ...state, totalCount, products };
  }
}

export const productStore = new ProductStore();
