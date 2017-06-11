import * as types from './constants';

export function login(user) {
  const obj = {
    _id: user.id,
    displayName: user.username || user.name,
    isFacebook: !!user.facebook,
    email: user.email ||
          (user.facebook ? user.facebook.email : null) ||
          user.username,
  };

  return { type: types.RECEIVE_USER, user: obj };
}

export function logout() {
  return { type: types.LOGOUT };
}
