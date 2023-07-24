class ApiAuth {
  constructor(options) {
    this._baseUrl = options._baseUrl;
    this._headers = options.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
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
      this._baseUrl + `users/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };
}

const apiAuth = new ApiAuth({
  baseUrl: 'http://api.dnknghmesto.nomoredomains.xyz/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

export default apiAuth;
