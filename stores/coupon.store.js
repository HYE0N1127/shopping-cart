import { coupons } from "../mocks/coupons.js";
import { CouponRepository } from "../repositories/coupon.repository.js";
import { State } from "../utils/state.js";

class CouponStore {
  #repository = new CouponRepository();

  state = new State({
    coupons: [],
    selectedCoupon: undefined,
  });

  getState() {
    return this.state.value;
  }

  setCoupon(id) {
    const state = this.getState();

    if (id === undefined) {
      this.state.value = { ...state, selectedCoupon: undefined };
    }

    const selected = state.coupons.find((coupon) => coupon.id === id);

    this.state.value = { ...state, selectedCoupon: selected };
  }

  fetch() {
    const state = this.getState();
    const coupons = this.#repository.getAll();

    this.state.value = { ...state, coupons };
  }
}

export const couponStore = new CouponStore();
