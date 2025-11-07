import { productItems } from "../mocks/products.js";
import { PRODUCTS_PER_REQUEST } from "../constants/product.js";
import { CartRepository } from "./cart.repository.js";

export class ProductRepository {
  getAll(page, limit) {
    const data = [...productItems].sort((a, b) => b.score - a.score);

    const start = (page - 1) * limit;
    const last = start + limit;

    const products = data.slice(start, last);

    return {
      products,
      totalCount: data.length,
    };
  }
}
