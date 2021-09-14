import { showError } from 'store/message';
import * as USER_PERFIL_TYPES from './userPerfil.actionTypes';
import UserPerfilApi from 'services/UserPerfilApi';

/**
 * Get User Name
 *
 * @returns {Promise} Request
 */
export const getUserName = () => async (dispatch) => {
  try {
    const response = await UserPerfilApi.getUserName();

    const userName = response.data?.user;
    dispatch({
      type: USER_PERFIL_TYPES.FETCH_USER_NAME_SUCCESS,
      payload: {
        userName,
      },
    });
  } catch (e) {
    dispatch({
      type: USER_PERFIL_TYPES.FETCH_USER_NAME_FAIL,
    });
    dispatch(showError(e.message));
  }
};
