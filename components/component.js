export class Component {
  element;

  constructor(htmlString) {
    const template = document.createElement("template");

    template.innerHTML = htmlString;

    this.element = template.content.firstElementChild;
  }

  attachTo(parent, position = "beforeend") {
    parent.insertAdjacentElement(position, this.element);
  }
}

export class RepaintableComponent extends Component {
  constructor(htmlString) {
    super(htmlString);
  }

  cleanup(parent = this.element) {
    const children = Array.from(parent.children);

    children.forEach((child) => this.element.removeChild(child));
  }
}
