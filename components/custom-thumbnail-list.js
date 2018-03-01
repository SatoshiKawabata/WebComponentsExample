import store from '../store.js';

export default class CustomThumbnailList extends HTMLElement {
  static get template () {
    return `
      <style>
        .footer {
          text-align: center;
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 8px;
        }
        custom-button {
          --color: #0078e7;
          --lavel-color: #fff;
          --width: 90%;
          --height: 50px;
        }
      </style>
      <div class="container"></div>
      <div class="footer"></div>
    `;
  }
  static get observedAttributes() {
    return ['hits'];
  }
  constructor() {
    super();
    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.innerHTML = CustomThumbnailList.template;
  }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    const newHits = newValue ? JSON.parse(newValue) : [];
    let thumbs = '';
    newHits.forEach(hit => {
      thumbs +=  `
        <custom-thumbnail
        likes=${hit.likes}
        favorites=${hit.favorites}
        comments=${hit.comments}
        page-url=${hit.pageURL}
        preview-url=${hit.previewURL}
        user_id=${hit.user_id}
        user=${hit.user}
        id=${hit.id}
        ></custom-thumbnail>
      `;
    });
    this.shadowRoot.querySelector('.container').innerHTML = thumbs;
    this._renderMoreButton();
  }

  _renderMoreButton() {
    const button = this.shadowRoot.querySelector('.footer').querySelector('.more');
    if (!button) {
      const b = document.createElement('custom-button');
      b.classList.add('more');
      b.oncustomclick = e => {
        store.more();
      };
      b.innerHTML = `<span slot="label">More load</span>`;
      this.shadowRoot.querySelector('.footer').appendChild(b);
    }
  }
}

customElements.define('custom-thumbnail-list', CustomThumbnailList);