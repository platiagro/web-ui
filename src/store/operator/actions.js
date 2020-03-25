// ACTION TYPES
import actionTypes from './actionTypes';

// UI ACTIONS
import { showDrawer } from '../ui/actions';

// DATASET ACTIONS
import { fetchDatasetColumnsRequest } from '../dataset/actions';

// ACTIONS
// ** SELECT OPERATOR
/**
 * select operator action
 * @param {string} operator
 * @returns {Function}
 */
export const selectOperator = (operator) => (dispatch) => {
  // dispatching action
  dispatch({
    type: actionTypes.SELECT_OPERATOR,
    operatorId: operator.uuid,
  });

  // is operator dataset?
  const isDataset = operator.uuid === 'dataset';

  // fetching dataset columns
  if (isDataset && operator.params.dataset)
    dispatch(fetchDatasetColumnsRequest(operator.params.dataset));

  // dispatching action to show drawer
  dispatch(showDrawer(operator.name, isDataset));
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
