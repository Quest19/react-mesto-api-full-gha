export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getJSON(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._getJSON)
  }

  getInitialCards() {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._getJSON)
  }

  patchUserInfo(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    .then(this._getJSON)
  }

  postNewCard(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data)
    })
    .then(this._getJSON)
  }

  deleteCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._getJSON)
  }

  putLikeCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._getJSON)
  }

  deleteLikeCard(cardId) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._getJSON)
  }

  patchProfileAvatar(data) {
    const token = localStorage.getItem("jwt");
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    .then(this._getJSON)
  }
}

const api = new Api({
  url: "http://api.quest19.nomoreparties.co",
});

export default api;