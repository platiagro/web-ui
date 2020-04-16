// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import operatorsApi from '../../services/OperatorsApi';

// UI ACTIONS
import {
  showDrawer,
  hideDrawer,
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
} from '../ui/actions';

// DATASET ACTIONS
import { fetchDatasetColumnsRequest } from '../dataset/actions';

// UTILS
import utils from '../../utils';

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
    operator,
  });

  // is operator dataset?
  const isDataset = operator.uuid === 'dataset';

  // fetching dataset columns
  if (isDataset)
    dispatch(fetchDatasetColumnsRequest(operator.parameters.dataset));

  // dispatching action to show drawer
  dispatch(showDrawer(operator.name, isDataset));
};

// // // // // // // // // //

// ** CREATE OPERATOR
/**
 * create operator success action
 * @param {Object} response
 * @param {string} componentIcon
 * @param {string} componentName
 * @param {string} trainingNotebookPath
 * @param {string} inferenceNotebookPath
 * @returns {Object} { type, operator }
 */
const createOperatorSuccess = (
  response,
  componentIcon,
  componentName,
  trainingNotebookPath,
  inferenceNotebookPath,
  parameters
) => (dispatch) => {
  // getting operator from response
  const operator = response.data;

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching create operator success action
  dispatch({
    type: actionTypes.CREATE_OPERATOR_SUCCESS,
    operator: {
      ...operator,
      icon: componentIcon,
      name: componentName,
      trainingNotebookPath,
      inferenceNotebookPath,
      parameters,
      selected: false,
    },
  });
};

/**
 * create operator fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const createOperatorFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching create operator fail
  dispatch({
    type: actionTypes.CREATE_OPERATOR_FAIL,
    errorMessage,
  });
};

/**
 * create operator request action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {Object} componentId
 * @param {Object[]} components,
 * @returns {Function}
 */
export const createOperatorRequest = (
  projectId,
  experimentId,
  componentId,
  components
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_OPERATOR_REQUEST,
  });

  // dispatching experiment operators loading data action
  dispatch(experimentOperatorsLoadingData());

  // getting component icon
  const {
    name: componentName,
    icon: componentIcon,
    trainingNotebookPath,
    inferenceNotebookPath,
    parameters,
  } = utils.getComponentData(components, componentId);

  // creating operator
  operatorsApi
    .createOperator(projectId, experimentId, componentId)
    .then((response) =>
      dispatch(
        createOperatorSuccess(
          response,
          componentIcon,
          componentName,
          trainingNotebookPath,
          inferenceNotebookPath,
          parameters
        )
      )
    )
    .catch((error) => dispatch(createOperatorFail(error)));
};

// // // // // // // // // //

// ** REMOVE OPERATOR
/**
 * remove operator success action
 * @param {Object} operatorId
 * @returns {Object} { type, operatorId }
 */
const removeOperatorSuccess = (operatorId) => (dispatch) => {
  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching hide drawer action
  dispatch(hideDrawer());

  // dispatching remove operator success action
  dispatch({
    type: actionTypes.REMOVE_OPERATOR_SUCCESS,
    operatorId,
  });
};

/**
 * remove operator fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const removeOperatorFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching remove operator fail
  dispatch({
    type: actionTypes.REMOVE_OPERATOR_FAIL,
    errorMessage,
  });
};

/**
 * remove operator request action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} operatorId
 * @returns {Function}
 */
export const removeOperatorRequest = (projectId, experimentId, operatorId) => (
  dispatch
) => {
  // dispatching request action
  dispatch({
    type: actionTypes.REMOVE_OPERATOR_REQUEST,
  });

  // dispatching experiment operators loading data action
  dispatch(experimentOperatorsLoadingData());

  // creating operator
  operatorsApi
    .deleteOperator(projectId, experimentId, operatorId)
    .then(() => dispatch(removeOperatorSuccess(operatorId)))
    .catch((error) => dispatch(removeOperatorFail(error)));
};

// // // // // // // // // //

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
