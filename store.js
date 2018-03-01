import api from './api.js';

class Store {
  constructor() {
    this.state = {
      search: {},
      currentPage: 1,
      currentText: null
    };
    this.handlers = [];
  }

  register(handler) {
    this.handlers.push(handler);
  }

  dispatch() {
    // ここでdispatch
    this.handlers.forEach(handler => {
      handler(this.state);
    });
  }

  search(text) {
    this.state.currentPage = 1;
    this.state.currentText = text;
    this.state.search = {};
    api.search(text, 1).then(res => {
      this.state.search = res;
      this.dispatch();
    })
  }

  more() {
    api.search(this.state.currentText, this.state.currentPage + 1).then(res => {
      this.state.search.hits.push(...res.hits);
      this.state.currentPage++;
      this.dispatch();
    });
  }
}

const store = new Store();
export default store;