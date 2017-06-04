import { combineReducers } from 'redux';
import * as types from './constants';
import auth from 'utils/auth';

const initialState = {
  user: null
};

const app = (state = initialState, action) => {
  switch (action.type) {
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
