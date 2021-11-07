class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка! ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  editUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  editUserAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes/`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }
}

const api = new Api({
  url: "http://localhost:3001",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
