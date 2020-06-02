// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import operatorsApi from '../../services/OperatorsApi';
import datasetsApi from '../../services/DatasetsApi';
import componentsApi from '../../services/ComponentsApi';
import pipelinesApi from '../../services/PipelinesApi';

// UI ACTIONS
import {
  experimentOperatorsDataLoaded,
  experimentOperatorsLoadingData,
  operatorParameterLoadingData,
  operatorParameterDataLoaded,
} from '../ui/actions';

// PIPELINES ACTIONS
import { getTrainExperimentStatusRequest } from '../pipelines/actions';

// OPERATOR ACTIONS
import { setOperatorParametersRequest } from '../operator/actions';

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
 * @param {string} datasetName
 * @param {string} targetColumn
 * @returns {Function}
 */
export const fetchOperatorsRequest = (
  projectId,
  experimentId,
  datasetName,
  targetColumn
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
    parameters: [
      { name: 'dataset', value: datasetName || '' },
      { name: 'target', value: targetColumn || '' },
    ],
    selected: false,
    settedUp: datasetName && targetColumn,
  };

  try {
    // getting operators
    const operatorsResponse = await operatorsApi.listOperators(
      projectId,
      experimentId
    );

    // getting components
    const componentsResponse = await componentsApi.listComponents();

    let datasetColumns = [];

    // getting dataset columns
    if (datasetName) {
      const response = await datasetsApi.listDatasetColumns(datasetName);

      datasetColumns = response.data;
    }

    // gettins pipelines status
    const pipelinesResponse = await pipelinesApi.getTrainExperimentStatus(
      experimentId
    );

    // configuring operators
    const configuredOperators = [
      dataset,
      ...utils.configureOperators(
        componentsResponse.data,
        operatorsResponse.data,
        datasetColumns,
        pipelinesResponse.data
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

// ** CLEAR OPERATORS FEATURE PARAMETERS
/**
 * clear operators feature parameters success action
 * @param {Object} response
 * @returns {Object} { type, operators }
 */
const clearOperatorsFeatureParametersSuccess = () => (dispatch) => {
  // dispatching operator parameter loading data action
  dispatch(operatorParameterDataLoaded());

  // dispatching clear operators feature parameters success action
  dispatch({
    type: actionTypes.CLEAR_OPERATORS_FEATURE_PARAMETERS_SUCCESS,
  });
};

/**
 * clear operators feature parameters fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const clearOperatorsFeatureParametersFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching operator parameter loading data action
  dispatch(operatorParameterDataLoaded());

  // dispatching clear operators feature parameters fail
  dispatch({
    type: actionTypes.CLEAR_OPERATORS_FEATURE_PARAMETERS_FAIL,
    errorMessage,
  });
};

/**
 * clear operators feature parameters if request action
 * @param {string} projectId
 * @param {string} experimentId
 * @param {string} datasetName
 * @returns {Function}
 */
export const clearOperatorsFeatureParametersRequest = (
  projectId,
  experimentId,
  datasetName
) => async (dispatch, getState) => {
  // getting operators
  const { operators } = getState();

  // dispatching request action
  dispatch({
    type: actionTypes.CLEAR_OPERATORS_FEATURE_PARAMETERS_REQUEST,
  });

  // dispatching operator parameter loading data action
  dispatch(operatorParameterLoadingData());

  try {
    const operatorsWithFeatureParameter = [];

    let datasetColumns = [];

    // getting dataset columns
    if (datasetName) {
      const response = await datasetsApi.listDatasetColumns(datasetName);

      datasetColumns = response.data;
    }

    // transforming dataset columns in feature options
    const featureOptions = utils.transformColumnsInParameterOptions(
      datasetColumns
    );

    // getting all operators with feature parameter
    operators.forEach((operator) => {
      const newOperator = { ...operator };

      // getting operator feature parameters
      const operatorFeatureParameters = operator.parameters.filter(
        (parameter, index) => {
          if (parameter.type === 'feature' && parameter.name !== 'target') {
            // updating feature parameter options
            newOperator.parameters[index].options = featureOptions;

            return true;
          }

          return false;
        }
      );

      // adding operator to list if it has feature parameters
      if (operatorFeatureParameters.length > 0)
        operatorsWithFeatureParameter.push({
          ...newOperator,
          operatorFeatureParameters,
        });
    });

    // dispatching actions to clear operators feature parameters
    operatorsWithFeatureParameter.forEach(
      ({ operatorFeatureParameters, ...operator }) => {
        operatorFeatureParameters.forEach((parameter) =>
          dispatch(
            setOperatorParametersRequest(
              projectId,
              experimentId,
              operator,
              parameter.name,
              null
            )
          )
        );
      }
    );

    // dispatching success action
    dispatch(clearOperatorsFeatureParametersSuccess());
  } catch (e) {
    // dispatching fail action
    dispatch(clearOperatorsFeatureParametersFail(e));
  }
};

// // // // // // // // // //
