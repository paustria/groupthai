import * as types from './constants';

import bcrypt from 'bcryptjs';
import { SET_AUTH, CHANGE_FORM, SENDING_REQUEST } from './constants';
import auth from 'utils/auth';
import genSalt from 'utils/salt';

export function login(user) {
  return { type: types.RECEIVE_USER, user };
}

export function logout() {
  return { type: types.LOGOUT };
}
