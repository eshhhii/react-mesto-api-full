class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка! ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  editUserInfo(name, about, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  editUserAvatar(url, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked, token) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  url: "https://api.eshhhii.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("jwt")}`,
  },
});

export default api;
