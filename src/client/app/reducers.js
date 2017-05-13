import { combineReducers } from 'redux';
import * as types from './constants';
import auth from 'utils/auth';

const initialState = {
    user: null,
    formState: {
        username: '',
        password: ''
    },
    currentlySending: false,
    loggedIn: auth.loggedIn()
};

const app = (state = initialState, action) => {
    switch (action.type) {
    case types.CHANGE_FORM:
        return {
            ...state,
            formState: action.newState
        };

    case types.SET_AUTH:
        return {
            ...state,
            loggedIn: action.newState
        };

    case types.SENDING_REQUEST:
        return {
            ...state,
            currentlySending: action.sending
        };

    default: return state;
    }
};

export default combineReducers({
    app
});
