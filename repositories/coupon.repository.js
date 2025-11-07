import { coupons } from "../mocks/coupons.js";
import { AmountCoupon, RateCoupon } from "../models/coupon.js";
import { generateId } from "../utils/id.js";

export class CouponRepository {
  getAll() {
    return coupons.map((coupon) => {
      const id = generateId();

      if (coupon.type === "rate") {
        return new RateCoupon({ ...coupon, id });
      } else {
        return new AmountCoupon({ ...coupon, id });
      }
    });
  }
}
