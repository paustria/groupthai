import * as types from './constants';

export function login(user) {
  const info = user.local ? user.local : user.facebook;

  const obj = {
    _id: user._id,
    displayName: info.username || user.name,
    isFacebook: !!user.facebook,
    email: info.email || info.username || null,
  };

  return { type: types.RECEIVE_USER, user: obj };
}

export function logout() {
  return { type: types.LOGOUT };
}
