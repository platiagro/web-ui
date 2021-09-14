import * as USER_PERFIL_TYPES from './userPerfil.actionTypes';

export const initialState = {
  userName: 'Usuário Anônimo',
  userEmail: 'email@email.com',
  userLogin: 'login',
  userPhoto: null,
};

/**
 * User Perfil reducer
 *
 * @param {object} state Current State
 * @param {object} action Action
 * @returns {object} New state
 */
export const userPerfilReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_PERFIL_TYPES.FETCH_USER_PERFIL_SUCCESS: {
      return {
        ...state,
        ...payload.userPerfil,
      };
    }
    case USER_PERFIL_TYPES.FETCH_USER_NAME_SUCCESS: {
      return {
        ...state,
        userName: payload.userName,
      };
    }

    default:
      return state;
  }
};
