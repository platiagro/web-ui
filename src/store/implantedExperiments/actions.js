// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// implanted experiments mock
import implantedExperimentsMock from '../../components/Content/ImplantedExperimentsContent/_/_implantedExperimentsMock';

// SERVICE
import implantedExperimentsApi from 'services/implantedExperimentsApi';

// UI ACTIONS
import {
  implantedExperimentsLoadingData,
  implantedExperimentsDataLoaded,
} from '../ui/actions';

// ACTIONS
/**
 * fetch implanted experiments action
 * @returns {type, implantedExperiments}
 */

/**
 * fetch implanted experiments success action
 * @param {Object} response
 * @returns {Object} { type, implanted }
 */
const implantedExperimentsSuccess = (response) => (dispatch) => {
  // getting implanted experiments from response
  const implanted = response.data;

  // dispatching implanted experiments table data loaded action
  dispatch(implantedExperimentsDataLoaded());

  // dispatching fetch implanted experiments success action
  dispatch({
    type: actionTypes.FETCH_IMPLANTED_EXPERIMENTS,
    implantedExperiments: implanted,
  });
};

/**
 * fetch implanted experiments fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const implantedExperimentsFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching implanted experiments table data loaded action
  dispatch(implantedExperimentsDataLoaded());

  // dispatching fetch implanted experiments fail action
  dispatch({
    type: actionTypes.FETCH_IMPLANTED_EXPERIMENTS_FAIL,
    errorMessage,
  });
};

export const fetchImplantedExperiments = () => (dispatch) => {
  dispatch(implantedExperimentsLoadingData());
  // fetching experiment
  implantedExperimentsApi
    .getDeployedExperiments()
    .then((response) => dispatch(implantedExperimentsSuccess(response)))
    .catch((error) => dispatch(implantedExperimentsFail(error)));
};

/**
 * delete implanted experiment action
 * @param {string} implantedExperimentUuid
 * @returns {type, implantedExperiments}
 */
export const deleteImplantedExperiment = (implantedExperimentUuid) => ({
  type: actionTypes.DELETE_IMPLANTED_EXPERIMENT,
  implantedExperiments: implantedExperimentsMock.filter(
    (implantedExperiment) =>
      implantedExperiment.uuid !== implantedExperimentUuid
  ),
});
