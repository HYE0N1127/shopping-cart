import { Component } from "../../component.js";

export class PaymentHeaderComponent extends Component {
  constructor() {
    super(`
      <div class="payment-header">
        <div class="payment-header__title">총 주문 금액</div>
        <div class="payment-header__title">할인 금액</div>
        <div class="payment-header__title">총 결제 금액</div>
      </div>
    `);
  }
}
