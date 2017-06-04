import * as types from './constants';

import bcrypt from 'bcryptjs';
import { SET_AUTH, CHANGE_FORM, SENDING_REQUEST } from './constants';
import auth from 'utils/auth';
import genSalt from 'utils/salt';

export function login(user) {
  const obj = {
    displayName: user.username || user.name,
    isFacebook: !!user.facebook,
    email: user.email ||
          (user.facebook ? user.facebook.email: null) ||
          user.username
  };

  return { type: types.RECEIVE_USER, user: obj };
}

export function logout() {
  return { type: types.LOGOUT };
}
