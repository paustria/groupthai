import { combineReducers } from 'redux';
import * as types from './constants';
import auth from 'utils/auth';

const initialState = {
  user: null,
  currentlySending: false,
  test: false
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_FORM:
      return {
        ...state,
        formState: action.newState
      };

    case types.SENDING_REQUEST:
      return {
        ...state,
        currentlySending: action.sending
      };

    case types.RECEIVE_USER:
      return {
        ...state,
        user: action.user
      };

    case types.LOGOUT:
      return initialState;

    default: return state;
  }
};

export default combineReducers({
  app
});
