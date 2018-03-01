import store from '../store.js';

export default class AppContainer extends HTMLElement {
  static get template () {
    return `
      <style>
        .container {
          text-align: center;
        }
        input {
          width: 500px;
        }
        custom-button {
          --color: #0078e7;
          --lavel-color: #fff;
        }
      </style>
      <div class="container">
        <h1>Image Searcher</h1>
        <input type="text" placeholder="Input and search images"></input>
        <custom-button>
          <span slot="label">Search</span>
        </custom-button>
      </div>
    `;
  }
  static get observedAttributes() {
    return [];
  }
  constructor() {
    super();

    store.register(state => {
      const hits = JSON.stringify(state.search.hits);
      let thumbList = this.shadowRoot.querySelector('custom-thumbnail-list');
      if (!thumbList) {
        thumbList = document.createElement('custom-thumbnail-list');
        this.shadowRoot.querySelector('.container').appendChild(thumbList);
      }
      thumbList.setAttribute('hits', hits);
    });

    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = AppContainer.template;
    this.shadowRoot.querySelector('custom-button').oncustomclick = () => {
      const thumbList = this.shadowRoot.querySelector('thumb-list');
      thumbList && this.shadowRoot.querySelector('.container').removeChild(thumbList);
      const text = this.shadowRoot.querySelector("input").value;
      store.search(text);
    };
  }
}

customElements.define('app-container', AppContainer);