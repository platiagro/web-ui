import { showError } from 'store/message';
import * as USER_PROFILE_TYPES from './userProfile.actionTypes';
import UserProfileApi from 'services/UserProfileApi';

/**
 * Get User Name
 *
 * @returns {Promise} Request
 */
export const getUserName = () => async (dispatch) => {
  try {
    const response = await UserProfileApi.getUserName();

    const userName = response.data?.user;
    dispatch({
      type: USER_PROFILE_TYPES.FETCH_USER_NAME_SUCCESS,
      payload: {
        userName,
      },
    });
  } catch (e) {
    dispatch({
      type: USER_PROFILE_TYPES.FETCH_USER_NAME_FAIL,
    });
    dispatch(showError(e.message));
  }
};
