import { Component } from "../component.js";

export class PageItemComponent extends Component {
  constructor() {
    super(`<div class="page__item"></div>`);
  }

  addChildren(...children) {
    children.forEach((child) => {
      child.attachTo(this.element);
    });
  }
}

export class PageComponent extends Component {
  #pageItemConstructor;

  constructor(pageItemConstructor) {
    super(`<div class="page"></div>`);

    this.#pageItemConstructor = pageItemConstructor;
  }

  addChildren(...children) {
    const item = new this.#pageItemConstructor();

    item.addChildren(...children);
    item.attachTo(this.element);
  }
}
