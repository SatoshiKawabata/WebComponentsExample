export default class CustomThumbnail extends HTMLElement {
  static get observedAttributes() {
    return [ 'likes', 'favorites', 'comments', 'page-url', 'preview-url', 'user_id', 'user', 'id' ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = {};
  }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    this.data[attributeName] = newValue;
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url(https://fonts.googleapis.com/icon?family=Material+Icons);
        a {
          color: #fff;
          text-decoration: none;
        }
        .container {
          position: relative;
          overflow: hidden;
        }
        .info {
          color: #fff;
          display: flex;
          position: absolute;
          bottom: -15px;
          opacity: 0;
          transition: .25s;
          width: 100%;
          justify-content: space-between;
          background: linear-gradient(to top,rgba(0,0,0,.6) 0,rgba(0,0,0,0) 100%);
        }
        .container:hover > .info {
          opacity: 1;
          bottom: 5px;
        }
        .info > * {
          margin: 0 8px 8px;
        }
        .thumb {
          width: 100%;
          display: block;
        }
        .user {
          transition: .25s;
          background-color: rgba(255,255,255,0);
          border-radius: 3px;
          padding: 2px 4px;
        }
        .user:hover {
          background-color: rgba(255,255,255,.3);
        }
        .counter i {
          font-size: 20px;
          margin-left: 8px;
          margin-right: 2px;
        }
      </style>
      <div class="container">
        <a href="${this.data['page-url']}">
          <img class="thumb" src="${this._convertPreviewURL(this.data['preview-url'])}">
        </a>
        <div class="info">
          <a class="user" href="https://pixabay.com/en/users/${this.data.user}-${this.data.user_id}" class="user">${this.data.user}</a>
          <div class="counter">
            <i class="material-icons">thumb_up</i>${this.data.likes}
            <i class="material-icons">star</i>${this.data.favorites}
            <a href="${this.data['page-url']}#comments">
              <i class="material-icons">comment</i>${this.data.comments}
            </a>
          </div>
        </div>
      </div>
    `;
  }

  _convertPreviewURL(url) {
    return url ? url.replace('_150', '__340') : url;
  }
}

customElements.define('custom-thumbnail', CustomThumbnail);