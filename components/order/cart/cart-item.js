import { cartStore } from "../../../stores/cart.store.js";
import { Component } from "../../component.js";

export class CartItemComponent extends Component {
  constructor(item) {
    const layout = `
      <li class="cart-item">
        <div class="cart-selector">
          <input type="checkbox" class="cart-item__checkbox" />
        </div>
        <div class="cart-info">
          <div class="cart-item__info-content">
            <img
              class="cart-item__thumbnail"
              src="https://img.29cm.co.kr/contents/itemDetail/201702/cut4_320170216150109.jpg?width=500"
            />
            <div class="cart-item__detail">
              <span class="cart-item__name"></span>
              <span class="cart-item__price"></span>
              <span class="cart-item__coupon-not-applied"
                >쿠폰 적용 불가 상품</span
              >
            </div>
          </div>
        </div>
        <div class="cart-quantity">
          <div class="quantity-control-group">
            <button class="quantity-button cart-item__quantity-minus">
              -
            </button>
            <p class="cart-item__quantity-count">1</p>
            <button class="quantity-button cart-item__quantity-plus">
              +
            </button>
          </div>
        </div>
        <div class="cart-price">
          <p class="cart-item__total-price">240,000원</p>
        </div>
      </li>
    `;
    super(layout);

    cartStore.state.subscribe(() => this.#bind(item));

    this.#bind(item);
  }

  #bind(item) {
    const checkBoxEl = this.element.querySelector(".cart-item__checkbox");

    checkBoxEl.checked = item.selected;
    checkBoxEl.onchange = (event) => {
      const isSelected = event.target.checked;
      cartStore.setSelected(item.product.item_no, isSelected);
    };

    const productThumbnailEl = this.element.querySelector(
      ".cart-item__thumbnail"
    );
    const productNameEl = this.element.querySelector(".cart-item__name");
    const productPriceEl = this.element.querySelector(".cart-item__price");
    const productCouponNotApplyEl = this.element.querySelector(
      ".cart-item__coupon-not-applied"
    );

    productThumbnailEl.src = item.product.detail_image_url;
    productNameEl.textContent = item.product.item_name;
    productPriceEl.textContent = `${item.product.price.toLocaleString(
      "ko-KR"
    )}원`;
    if (item.product.availableCoupon === false) {
      productCouponNotApplyEl.style.display = "block";
    } else {
      productCouponNotApplyEl.style.display = "none";
    }

    const quantityMinusEl = this.element.querySelector(
      ".cart-item__quantity-minus"
    );
    const quantityPlusEl = this.element.querySelector(
      ".cart-item__quantity-plus"
    );
    const quantityCountEl = this.element.querySelector(
      ".cart-item__quantity-count"
    );

    quantityCountEl.textContent = item.quantity;

    quantityMinusEl.onclick = () => {
      if (item.quantity <= 1) {
        return;
      }

      cartStore.setQuantity(item.product.item_no, item.quantity - 1);
      cartStore.fetch();
    };

    quantityPlusEl.onclick = () => {
      if (item.quantity === 99) {
        return;
      }

      cartStore.setQuantity(item.product.item_no, item.quantity + 1);
      cartStore.fetch();
    };

    const totalPriceEl = this.element.querySelector(".cart-item__total-price");

    totalPriceEl.textContent = `${(
      item.product.price * item.quantity
    ).toLocaleString("ko-KR")}원`;
  }
}
