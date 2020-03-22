// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import operatorsApi from '../../services/OperatorsApi';

// ACTIONS
// ** FETCH OPERATORS
/**
 * fetch operators success action
 * @param {Object} response
 * @returns {Object} { type, operators }
 */
const fetchOperatorsSuccess = (response) => {
  // getting operators from response
  const operators = response.data;

  return {
    type: actionTypes.FETCH_OPERATORS_SUCCESS,
    operators,
  };
};

/**
 * fetch operators fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchOperatorsFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_OPERATORS_FAIL,
    errorMessage,
  };
};

/**
 * fetch operators request action
 * @param {string} projectId
 * @param {string} experimentId
 * @returns {Function}
 */
export const fetchOperatorsRequest = (projectId, experimentId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_OPERATORS_REQUEST,
  });

  // fetching operators
  operatorsApi
    .listOperators(projectId, experimentId)
    .then((response) => dispatch(fetchOperatorsSuccess(response)))
    .catch((error) => dispatch(fetchOperatorsFail(error)));
};

// // // // // // // // // //

/**
 * add experiment operator action
 * @param {string} experimentUuid
 * @param {Object} task
 * @returns {type, operators}
 */
export const addOperator = (experimentUuid, task) => ({
  type: actionTypes.ADD_OPERATOR,
  operators: [] /* [...flowMock, taskMock], */,
});

/**
 * remove experiment operator action
 * @param {string} experimentUuid
 * @param {string} taskUuid
 * @returns {type, operators}
 */
export const removeOperator = (experimentUuid, taskUuid) => ({
  type: actionTypes.REMOVE_OPERATOR,
  operators: [] /* flowMock.filter((task) => task.uuid !== taskUuid), */,
});

/**
 * set experiment operator params action
 * @param {string} experimentUuid
 * @param {string} taskUuid
 * @param {Object} taskParams
 * @returns {type, operators}
 */
export const setOperatorParams = (experimentUuid, taskUuid, taskParams) => ({
  type: actionTypes.SET_OPERATOR_PARAMS,
  operators: [] /* flowMock.map((task) =>
    task.uuid !== 'tarefa07' ? task : { ...task, settedUp: true }
  ), */,
});
