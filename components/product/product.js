import { cartStore } from "../../stores/cart.store.js";
import { MAX_CART_ITEM_COUNT } from "../../constants/cart.js";
import { Component } from "../component.js";

export class ProductComponent extends Component {
  constructor(product) {
    super(`
      <a class="product">
        <img class="product__thumbnail"/>

        <div class="product__info">
          <p class="product__item-name"></p>
          <p class="product__price"></p>
        </div>

        <button class="product__add-cart-button"></button>
      </a>
    `);

    cartStore.state.subscribe(() => this.#bind(product));

    this.#bind(product);
  }

  #isExist(product) {
    const { cartItems } = cartStore.getState();

    return (
      cartItems.findIndex(
        (item) => item.product.item_no === product.item_no
      ) !== -1
    );
  }

  #bind(product) {
    const thumbnailEl = this.element.querySelector(".product__thumbnail");

    thumbnailEl.src = product.detail_image_url;

    const nameEl = this.element.querySelector(".product__item-name");

    nameEl.textContent = product.item_name;

    const priceEl = this.element.querySelector(".product__price");

    priceEl.textContent = `${product.price.toLocaleString("ko-KR")}원`;

    const cartButtonEl = this.element.querySelector(
      ".product__add-cart-button"
    );

    const isExist = this.#isExist(product);

    cartButtonEl.setAttribute("data-exist", `${isExist}`);
    cartButtonEl.textContent = isExist ? "장바구니 빼기" : "장바구니 담기";

    cartButtonEl.onclick = () => {
      if (isExist) {
        cartStore.removeItem(product.item_no);
        return;
      }

      const { cartItems } = cartStore.getState();

      if (cartItems.length >= MAX_CART_ITEM_COUNT) {
        alert("장바구니에는 세 개의 아이템까지만 담을 수 있습니다.");
        return;
      }

      cartStore.addItem(product);
    };
  }
}
