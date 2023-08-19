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
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(this._getJSON)
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
    .then(this._getJSON)
  }

  patchUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._getJSON)
  }

  postNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(this._getJSON)
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getJSON)
  }

  putLikeCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getJSON)
  }

  deleteLikeCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getJSON)
  }

  patchProfileAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._getJSON)
  }
}

const api = new Api({
  url: "http://localhost:3000/",
  headers: { 
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  }
});


export default api;