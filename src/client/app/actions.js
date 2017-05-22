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
* Registers a user
* @param  {string} username The username of the new user
* @param  {string} password The password of the new user
*/
export function register(username, password) {
    return (dispatch) => {
        // Show the loading indicator, hide the last error
        dispatch(sendingRequest(true));
        removeLastFormError();
        // If no username or password was specified, throw a field-missing error
        if (anyElementsEmpty({ username, password })) {
            requestFailed({
                type: 'field-missing'
            });
            dispatch(sendingRequest(false));
            return;
        }
        // Generate salt for password encryption
        const salt = genSalt(username);
        // Encrypt password
        bcrypt.hash(password, salt, (err, hash) => {
            // Something wrong while hashing
            if (err) {
                requestFailed({
                    type: 'failed'
                });
                return;
            }
            // Use auth.js to fake a request
            auth.register(username, hash, (success, err) => {
                // When the request is finished, hide the loading indicator
                dispatch(sendingRequest(false));
                dispatch(setAuthState(success));
                if (success) {
                    // If the register worked, forward the user to the homepage and clear the form
                    forwardTo('/dashboard');
                    dispatch(changeForm({
                        username: '',
                        password: ''
                    }));
                } else {
                    requestFailed({
                        type: 'unauthorized'
                    });
                }
            });
        });
    };
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
