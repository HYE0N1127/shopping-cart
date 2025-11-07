class Coupon {
  #id;
  #type;
  #title;

  constructor(coupon) {
    this.#id = coupon.id;
    this.#type = coupon.type;
    this.#title = coupon.title;
  }

  get id() {
    return this.#id;
  }

  get type() {
    return this.#type;
  }

  get title() {
    return this.#title;
  }
}

export class RateCoupon extends Coupon {
  #discountRate;

  constructor(coupon) {
    super(coupon);

    this.#discountRate = coupon.discountRate;
  }

  discount(price) {
    return Math.floor(price * ((100 - this.#discountRate) / 100));
  }
}

export class AmountCoupon extends Coupon {
  #discountAmount;

  constructor(coupon) {
    super(coupon);

    this.#discountAmount = coupon.discountAmount;
  }

  discount(price) {
    if (price < this.#discountAmount) {
      return 0;
    }

    return price - this.#discountAmount;
  }
}
