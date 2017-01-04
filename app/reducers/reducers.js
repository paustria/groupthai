import { CHANGE_FORM, SET_AUTH, SENDING_REQUEST } from '../constants/AppConstants';

const assign = Object.assign;
import auth from '../utils/auth';

const initialState = {
    formState: {
        username: '',
        password: ''
    },
    currentlySending: false,
    loggedIn: auth.loggedIn()
};

export function homeReducer(state = initialState, action) {
    switch (action.type) {
    case CHANGE_FORM:
        return assign({}, state, {
            formState: action.newState
        });
        break;
    case SET_AUTH:
        return assign({}, state, {
            loggedIn: action.newState
        });
        break;
    case SENDING_REQUEST:
        return assign({}, state, {
            currentlySending: action.sending
        });
        break;
    default:
        return state;
    }
}
