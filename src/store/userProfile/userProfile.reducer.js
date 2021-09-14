import * as USER_PROFILE_TYPES from './userProfile.actionTypes';

export const initialState = {
  userName: 'Usuário Anônimo',
  userEmail: 'email@email.com',
  userLogin: 'login',
  userPhoto: null,
};

/**
 * User Profile reducer
 *
 * @param {object} state Current State
 * @param {object} action Action
 * @returns {object} New state
 */
export const userProfileReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_PROFILE_TYPES.FETCH_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        ...payload.userProfile,
      };
    }
    case USER_PROFILE_TYPES.FETCH_USER_NAME_SUCCESS: {
      return {
        ...state,
        userName: payload.userName,
      };
    }

    default:
      return state;
  }
};
