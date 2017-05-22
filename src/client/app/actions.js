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

/**
* Sets the authentication state of the application
* @param {boolean} newState True means a user is logged in, false means no user is logged in
*/
export function setAuthState(newState) {
  return { type: SET_AUTH, newState };
}

/**
* Sets the form state
* @param  {object} newState          The new state of the form
* @param  {string} newState.username The new text of the username input field of the form
* @param  {string} newState.password The new text of the password input field of the form
* @return {object}                   Formatted action for the reducer to handle
*/
export function changeForm(newState) {
  return { type: CHANGE_FORM, newState };
}

/**
* Sets the requestSending state, which displays a loading indicator during requests
* @param  {boolean} sending The new state the app should have
* @return {object}          Formatted action for the reducer to handle
*/
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

/**
* Forwards the user
* @param {string} location The route the user should be forwarded to
*/
function forwardTo(location) {
  console.log('forwardTo(' + location + ')');
  // browserHistory.push(location);
}

/**
* Called when a request failes
* @param  {object} err An object containing information about the error
*/
function requestFailed(err) {
  const formError = document.querySelector('.form-error');
  // Remove the class of the last error so there can only ever be one
  removeLastFormError();

  formError.innerText = 'The credentials you entered are incorrect.';
  formError.classList.remove('hide');
}

/**
* Removes the last error from the form
*/
function removeLastFormError() {
  document.querySelector('.form-error').classList.add('hide');
}

/**
* Checks if any elements of a JSON object are empty
* @param  {object} elements The object that should be checked
* @return {boolean}         True if there are empty elements, false if there aren't
*/
function anyElementsEmpty(elements) {
  for (let element in elements) {
    if (!elements[element]) {
      return true;
    }
  }
  return false;
}
