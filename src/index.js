import fetch from 'node-fetch';

const pokeauth = {
  apiKey: 'AIzaSyDIO0qyF90wiDcg2uYXVQf_RuJnOLlbr68',
  databaseUrl: 'https://pokeauth.firebaseio.com',
  developer: {
    id: '',
    token: '',
    refreshToken: '',
    expiry: 0,
  },
  login: async(email, password) => {
    // set token expiry time (1 hour)
    const expires = pokeauth.getExpiry();
    // get token
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${pokeauth.apiKey}`
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });
    const developer = await result.json();
    pokeauth.developer = {
      id: developer.localId,
      token: developer.idToken,
      refreshToken: developer.refreshToken,
      expiry: expires,
    };
  },
  getUserToken: async(uid) => {
    const now = new Date().getTime();
    if (now >= pokeauth.developer.expiry) {
      await pokeauth.refresh();
    }
    const url = `${pokeauth.databaseUrl}/users/${uid}/access.json?auth=${pokeauth.developer.token}`
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    });
    const access = await result.json();
    return access;
  },
  refresh: async() => {
    const expires = pokeauth.getExpiry();
    // refresh token
    const url = `https://securetoken.googleapis.com/v1/token?key=${pokeauth.apiKey}`
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        grantType: 'refresh_token',
        refreshToken: pokeauth.developer.refreshToken
      })
    });
    const developer = await result.json();
    pokeauth.developer = {
      id: developer.user_id,
      token: developer.id_token,
      refreshToken: developer.refresh_token,
      expiry: expires,
    };
  },
  getExpiry: () => {
    const now = new Date();
    now.setHours(now.getHours()+1);
    return now.getTime();
  },
}

export default pokeauth;
