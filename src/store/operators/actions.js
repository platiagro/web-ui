// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import operatorsApi from '../../services/OperatorsApi';
import componentsApi from '../../services/ComponentsApi';

// UTILS
import utils from '../../utils';

// ACTIONS
// ** FETCH OPERATORS
/**
 * fetch operators success action
 * @param {Object} response
 * @returns {Object} { type, operators }
 */
const fetchOperatorsSuccess = (operators) => {
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
    dispatch(fetchOperatorsSuccess(configuredOperators));
  } catch (e) {
    // dispatching fail action
    dispatch(fetchOperatorsFail(e));
  }
};

// // // // // // // // // //
