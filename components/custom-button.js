export default class CustomButton extends HTMLElement {
  static get template () {
    return `
      <style>
        button {
          padding: 8px 8px;
          border: none;
          background-color: var(--color);
          border-radius: 3px;
          color: var(--lavel-color);
          width: var(--width);
          height: var(--height);
          cursor: pointer;
        }
      </style>
      <button type="button">
        <slot name="label"></slot>
      </button>
    `;
  }

  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = CustomButton.template;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').onclick = e => {
      this.oncustomclick(e);
    }
  }
}

customElements.define('custom-button', CustomButton);