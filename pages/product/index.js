import { ProductComponent } from "../../components/product/product.js";
import { ProductsComponent } from "../../components/product/products.js";
import { PaginationComponent } from "../../components/product/pagination.js";
import { PaginationItemComponent } from "../../components/product/pagination-item.js";

class App {
  constructor(root) {
    new ProductsComponent(ProductComponent).attachTo(root, "afterbegin");

    new PaginationComponent(PaginationItemComponent).attachTo(
      root,
      "beforeend"
    );
  }
}

new App(document.getElementById("root"));
