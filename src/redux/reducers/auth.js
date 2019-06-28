import { SIGN_IN, SIGN_OUT } from '../actionTypes';

const initialState = {
  isLoggedIn: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isLoggedIn: true
      };
      case SIGN_OUT:
        return {
          ...state,
          isLoggedIn: false
        };
    default:
      return state;
  }
};
