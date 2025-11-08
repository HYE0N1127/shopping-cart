import { cartStore } from "../../../stores/cart.store.js";
import { Component } from "../../component.js";

export class CartHeaderComponent extends Component {
  constructor() {
    super(`
      <div class="cart-header">
        <div class="cart-selector">
          <input type="checkbox" class="cart-item__checkbox cart-item__check-all" />
        </div>
        <div class="cart-info">
          <span class="cart-header__title">상품 정보</span>
        </div>
        <div class="cart-quantity">
          <span class="cart-header__title">수량</span>
        </div>
        <div class="cart-price">
          <span class="cart-header__title">주문 금액</span>
        </div>
      </div>
    `);

    cartStore.state.subscribe(() => this.#bind());

    this.#bind();
  }

  #isAllSelected() {
    const products = cartStore.getState();
    return products.cartItems.every((item) => item.selected === true);
  }

  #bind() {
    const selectAllCheckBox = this.element.querySelector(
      ".cart-item__check-all"
    );

    selectAllCheckBox.checked = this.#isAllSelected();

    selectAllCheckBox.onchange = (event) => {
      const isSelected = event.target.checked;
      cartStore.setSelectedAll(isSelected);
    };
  }
}
