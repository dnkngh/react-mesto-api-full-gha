class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authHeaders = null;
  };

  setAuthHeader(token) {
    this._authHeaders = {...this._headers, authorization: `Bearer ${token}`};
  };

  clearAuthHeader() {
    this._authHeaders = null;
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  };

  getInitialCards() {
    return this._request(
      this._baseUrl + 'cards',
      {
        method: 'GET',
        headers: this._authHeaders,
      },
    );
  };

  getUserInfo() {
    return this._request(
      this._baseUrl + 'users/me',
      {
        method: 'GET',
        headers: this._authHeaders,
      },
    );
  };

  setUserInfo(data) {
    return this._request(
      this._baseUrl + 'users/me',
      {
        method: 'PATCH',
        headers: this._authHeaders,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      },
    );
  };

  setUserAvatar(data) {
    return this._request(
      this._baseUrl + 'users/me/avatar',
      {
        method: 'PATCH',
        headers: this._authHeaders,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      },
    );
  };

  addCard(data) {
    return this._request(
      this._baseUrl + 'cards',
      {
        method: 'POST',
        headers: this._authHeaders,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      },
    );
  };

  deleteCard(id) {
    return this._request(
      this._baseUrl + `cards/${id}`,
      {
        method: 'DELETE',
        headers: this._authHeaders,
      },
    );
  };

  changeLikeCardStatus(id, isLiked) {
    return this._request(
      this._baseUrl + `cards/${id}/likes`,
      {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: this._authHeaders,
      }
    )
  }

  likeCard(id) {
    return this._request(
      this._baseUrl + `cards/${id}/likes`,
      {
        method: 'PUT',
        headers: this._authHeaders,
      },
    );
  };

  dislikeCard(id) {
    return this._request(
      this._baseUrl + `cards/${id}/likes`,
      {
        method: 'DELETE',
        headers: this._authHeaders,
      },
    );
  };

  gatherInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  };

  register(data) {
    return this._request(
      this._baseUrl + `signup`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
      },
    );
  };

  login(data) {
    return this._request(
      this._baseUrl + `signin`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
      },
    );
  };

  checkToken(token) {
    return this._request(
      this._baseUrl + 'users/me',
      {
        method: 'GET',
        headers: this._authHeaders,
      },
    );
  };
}

const api = new Api({
  baseUrl: 'https://api.dnknghmesto.nomoredomains.xyz/',
  headers: {
    // authorization: '0bd885b9-3a94-4715-9b47-6375e24059b0',
    'Content-Type': 'application/json',
  },
});

export default api;
