const URL = "https://script.google.com/macros/s/AKfycbzupNHlJM6lWjGT2lGqf-J28rIxCWr6mOpEL3sEkuzrRWEQ8ylv/exec?";

class Api {
  search(text, page = 1) {
    const query = {
      q: text,
      page
    };
    let queryString = "";
    for (let key in query) {
      queryString += "&" + key + "=" + query[key];
    }
    const xhr = new XMLHttpRequest();
    xhr.open("GET", URL + queryString);
    xhr.send();
    return new Promise((res, rej) => {
      xhr.onloadend = e => {
        const param = JSON.parse(e.target.response);
        res(param);
      };
      xhr.onerror = err => {
        rej(err);
      };
    });
  }
}

const api = new Api();
export default api;