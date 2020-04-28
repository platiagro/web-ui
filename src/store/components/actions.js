// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import componentsApi from '../../services/ComponentsApi';

// ACTIONS
// ** FETCH COMPONENTS
/**
 * fetch components success action
 * @param {Object} response
 * @returns {Object} { type, components }
 */
const fetchComponentsSuccess = (response) => {
  // getting components components from response
  const components = response.data;

  return {
    type: actionTypes.FETCH_COMPONENTS_SUCCESS,
    components,
  };
};

/**
 * fetch components fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchComponentsFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_COMPONENTS_FAIL,
    errorMessage,
  };
};

/**
 * fetch components request action
 * @returns {Function}
 */
export const fetchComponentsRequest = () => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_COMPONENTS_REQUEST,
  });

  // fetching components
  componentsApi
    .listComponents()
    .then((response) => dispatch(fetchComponentsSuccess(response)))
    .catch((error) => dispatch(fetchComponentsFail(error)));
};

// // // // // // // // // //

// EXPORT DEFAULT
export default fetchComponentsRequest;
