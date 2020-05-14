// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// implanted experiments mock
import implantedExperimentsMock from '../../components/Content/ImplantedExperimentsContent/_/_implantedExperimentsMock';

// SERVICE
import implantedExperimentsApi from 'services/implantedExperimentsApi';

// ACTIONS
/**
 * fetch implanted experiments action
 * @returns {type, implantedExperiments}
 */

export const fetchImplantedExperiments = () => (dispatch) => {
  // fetching experiment
  implantedExperimentsApi
    .getDeployedExperiments()
    .then((response) => {
      // dispatching request action
      dispatch({
        type: actionTypes.FETCH_IMPLANTED_EXPERIMENTS,
        implantedExperiments: response.data,
      });
    })
    .catch((error) => console.log(error));
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
