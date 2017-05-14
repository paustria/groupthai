import * as requests from 'utils/http';
import Cookies from 'js-cookie';

/**
* Authentication lib
* @type {Object}
*/
var auth = {
    /**
    * Logs a user in
    * @param  {string}   username The username of the user
    * @param  {string}   password The password of the user
    * @param  {Function} callback Called after a user was logged in on the remote server
    */
    async login(username, password, callback) {
        // If there is a token in the cookies, the user already is authenticated.
        if (this.loggedIn()) {
            callback(true);
            return;
        }

        try {
            const response = await requests.post('/login', '', { username, password })
            const body = await response.json();

            if (res.authenticated) {
                Cookies.set('token', res.token);
                callback(true);
            } else {
                callback(false, res.error);
            }
        } catch (err) {
            var e = err;
            callback(false, err.message);
        }
    },
    /**
    * Logs the current user out
    */
    logout(callback) {
        Cookies.remove('token');
        callback();
    },
    /**
    * Checks if anybody is logged in
    * @return {boolean} True if there is a logged in user, false if there isn't
    */
    loggedIn() {
        return !!Cookies.get('token');
    },
    /**
    * Registers a user in the system
    * @param  {string}   username The username of the user
    * @param  {string}   password The password of the user
    * @param  {Function} callback Called after a user was registered on the remote server
    */
    register(username, password, callback) {
        // Post a fake request
        // request.post('/register', { username, password }, (response) => {
        //     // If the user was successfully registered, log them in
        //     if (response.registered === true) {
        //         this.login(username, password, callback);
        //     } else {
        //         // If there was a problem registering, show the error
        //         callback(false, response.error);
        //     }
        // });
    },
    onChange() {}
};

module.exports = auth;
