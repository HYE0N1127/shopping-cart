import { couponStore } from "../../../stores/coupon.store.js";
import { RepaintableComponent } from "../../component.js";

export class CouponSelectComponent extends RepaintableComponent {
  constructor() {
    super(`<select class="coupon__select"></select>`);

    couponStore.state.subscribe(() => this.#bind());

    couponStore.fetch();

    this.#bind();
  }

  #bind() {
    this.cleanup();

    const { coupons, selectedCoupon } = couponStore.getState();

    const defaultOption = {
      id: undefined,
      title: "없음",
    };

    const options = [defaultOption, ...coupons];

    options.forEach((option) => {
      const optionEl = document.createElement("option");

      optionEl.value = option.id;
      optionEl.textContent = option.title;

      this.element.appendChild(optionEl);
    });

    this.element.value = selectedCoupon?.id;

    this.element.onchange = (event) => {
      const id = event.target.value;

      if (id === undefined) {
        couponStore.setCoupon();
      } else {
        couponStore.setCoupon(id);
      }
    };
  }
}
