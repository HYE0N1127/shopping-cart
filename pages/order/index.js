import { CartHeaderComponent } from "../../components/order/cart/cart-header.js";
import { CartItemComponent } from "../../components/order/cart/cart-item.js";
import { CartListComponent } from "../../components/order/cart/cart-list.js";
import { CouponHeaderComponent } from "../../components/order/coupon/coupon-header.js";
import { CouponSelectComponent } from "../../components/order/coupon/coupon-select.js";
import {
  PageComponent,
  PageItemComponent,
} from "../../components/order/page.js";
import { PaymentContentComponent } from "../../components/order/payment/payment-content.js";
import { PaymentHeaderComponent } from "../../components/order/payment/payment-header.js";

class OrderPage {
  constructor(root) {
    const page = new PageComponent(PageItemComponent);

    page.addChildren(
      new CartHeaderComponent(),
      new CartListComponent(CartItemComponent)
    );

    page.addChildren(new CouponHeaderComponent(), new CouponSelectComponent());

    page.addChildren(
      new PaymentHeaderComponent(),
      new PaymentContentComponent()
    );

    page.attachTo(root);
  }
}

new OrderPage(document.getElementById("root"));
