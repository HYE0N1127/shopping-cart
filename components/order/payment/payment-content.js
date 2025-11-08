import { cartStore } from "../../../stores/cart.store.js";
import { couponStore } from "../../../stores/coupon.store.js";
import { Component } from "../../component.js";

export class PaymentContentComponent extends Component {
  constructor() {
    super(`
      <div class="payment">
        <div class="payment__price payment__total-price"></div>
        <div class="payment__price payment__discount-price"></div>
        <div class="payment__price payment__payment-price"></div>
        <div class="operator minus-sign">-</div>
        <div class="operator equal-sign">=</div>
      </div>
    `);

    cartStore.state.subscribe(() => this.#bind());
    couponStore.state.subscribe(() => this.#bind());

    this.#bind();
  }

  #calculatePaymentPrice(cartItems, coupon) {
    if (coupon === undefined) {
      return;
    }

    let discountablePrice = 0;
    let notDiscountablePrice = 0;

    cartItems.forEach((item) => {
      if (item.selected === false) {
        return;
      }

      if (item.product.availableCoupon === false) {
        notDiscountablePrice += item.product.price * item.quantity;
      } else {
        discountablePrice += item.product.price * item.quantity;
      }
    });

    return coupon.discount(discountablePrice) + notDiscountablePrice;
  }

  #getTotalPrice(cartItems) {
    return cartItems.reduce((prev, curr) => {
      if (curr.selected === false) {
        return prev;
      }

      return prev + curr.product.price * curr.quantity;
    }, 0);
  }

  #bind() {
    const { selectedCoupon } = couponStore.getState();
    const { cartItems } = cartStore.getState();

    const totalPrice = this.#getTotalPrice(cartItems);
    const paymentPrice =
      this.#calculatePaymentPrice(cartItems, selectedCoupon) ?? totalPrice;

    const discountedPrice = totalPrice - paymentPrice;

    const totalPriceEl = this.element.querySelector(
      ".payment__price.payment__total-price"
    );
    const discountPriceEl = this.element.querySelector(
      ".payment__price.payment__discount-price"
    );
    const paymentPriceEl = this.element.querySelector(
      ".payment__price.payment__payment-price"
    );

    totalPriceEl.textContent = `${totalPrice.toLocaleString("ko-KR")}원`;
    discountPriceEl.textContent = `${discountedPrice.toLocaleString(
      "ko-KR"
    )}원`;
    paymentPriceEl.textContent = `${paymentPrice.toLocaleString("ko-KR")}원`;
  }
}
