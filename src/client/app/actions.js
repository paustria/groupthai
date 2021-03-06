import * as types from './constants';

export const login = (user) => {
  const info = user.local ? user.local : user.facebook;

  const obj = {
    _id: user._id,
    displayName: info.username || user.name,
    isFacebook: !!user.facebook,
    email: info.email || info.username || null,
  };

  return { type: types.RECEIVE_USER, user: obj };
};

export const fetchUser = () => async (dispatch) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  try {
    const response = await fetch('/user', options);

    if (!response.ok) {
      throw Error(response.statusText);
    }
    const body = await response.json();
    return dispatch(login(body.user));
  } catch (err) {
    // Unauthorized
    return null;
  }
};

export const fetchLogin = (username, password, url) => async (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.statusText === 'Unauthorized') {
        throw Error('Username and/or password combination is incorrect.');
      }
      if (response.statusText === 'Forbidden') {
        throw Error('Email is already existed.');
      }
      throw Error(response.statusText);
    }
    const body = await response.json();
    return dispatch(login(body.user));
  } catch (err) {
    throw Error(err.message);
  }
};

export const logout = () => async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  try {
    const response = await fetch('/logout', options);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return ({ type: types.LOGOUT });
  } catch (err) {
    throw Error(err.message);
  }
};
