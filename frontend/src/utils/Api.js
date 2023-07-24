class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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
      this._baseUrl + `cards/likes/${id}`,
      {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: this._authHeaders,
      }
    )
  }

  likeCard(id) {
    return this._request(
      this._baseUrl + `cards/likes/${id}`,
      {
        method: 'PUT',
        headers: this._authHeaders,
      },
    );
  };

  dislikeCard(id) {
    return this._request(
      this._baseUrl + `cards/likes/${id}`,
      {
        method: 'DELETE',
        headers: this._authHeaders,
      },
    );
  };

  gatherInitialData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  };



  setAuthHeader(token) {
    this._authHeader = {...this._headers, authorization: `Bearer ${token}`};
  };

  clearAuthHeader() {
    this._authHeader = null;
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
  baseUrl: 'http://api.dnknghmesto.nomoredomains.xyz/',
  headers: {
    // authorization: '0bd885b9-3a94-4715-9b47-6375e24059b0',
    'Content-Type': 'application/json',
  },
});

export default api;
