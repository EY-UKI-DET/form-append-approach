export default class OutputItemElement extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = this.render();
    shadow
      .querySelector("button")!
      .addEventListener("click", () => this.remove());
  }
  render() {
    return /*html*/ `
      <style>
        :host {
          align-items: center;
          display: flex;
          gap: 0.5rem;
          justify-content: space-between;
        }
        slot {
          word-break: break-word;
        }
      </style>
      <slot></slot>
      <button title="Remove">🗑️</button>
    `;
  }
}

customElements.define("output-item", OutputItemElement);
