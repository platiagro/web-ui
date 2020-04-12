// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import operatorsApi from '../../services/OperatorsApi';
import componentsApi from '../../services/ComponentsApi';

// UI ACTIONS
import {
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
} from '../ui/actions';

// PIPELINES ACTIONS
import { getTrainExperimentStatusRequest } from '../pipelines/actions';

// UTILS
import utils from '../../utils';

// ACTIONS
// ** FETCH OPERATORS
/**
 * fetch operators success action
 * @param {Object} response
 * @returns {Object} { type, operators }
 */
const fetchOperatorsSuccess = (operators, experimentId) => (dispatch) => {
  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching get training experiment status request action
  dispatch(getTrainExperimentStatusRequest(experimentId));

  // dispatching fetch operators success action
  dispatch({
    type: actionTypes.FETCH_OPERATORS_SUCCESS,
    operators,
  });
};

/**
 * fetch operators fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchOperatorsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching experiment operators data loaded action
  dispatch(experimentOperatorsDataLoaded());

  // dispatching fetch operators fail
  dispatch({
    type: actionTypes.FETCH_OPERATORS_FAIL,
    errorMessage,
  });
};

/**
 * fetch operators request action
 * @param {string} projectId
 * @param {string} experimentId
 * @returns {Function}
 */
// eslint-disable-next-line import/prefer-default-export
export const fetchOperatorsRequest = (
  projectId,
  experimentId,
  datasetName
) => async (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_OPERATORS_REQUEST,
  });

  // dispatching experiment operators loading data action
  dispatch(experimentOperatorsLoadingData());

  // dataset operator mock
  const dataset = {
    icon: 'database',
    name: 'Conjunto de Dados',
    position: -1,
    uuid: 'dataset',
    params: { dataset: datasetName || '' },
  };

  try {
    // getting operators
    const operatorsResponse = await operatorsApi.listOperators(
      projectId,
      experimentId
    );
    // getting components
    const componentsResponse = await componentsApi.listComponents();

    // configuring operators
    const configuredOperators = [
      dataset,
      ...utils.configureOperators(
        componentsResponse.data,
        operatorsResponse.data
      ),
    ];

    // dispatching success action
    dispatch(fetchOperatorsSuccess(configuredOperators, experimentId));
  } catch (e) {
    // dispatching fail action
    dispatch(fetchOperatorsFail(e));
  }
};

// // // // // // // // // //
