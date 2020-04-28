// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// implanted experiments mock
import implantedExperimentsMock from '../../components/Content/ImplantedExperimentsContent/_/_implantedExperimentsMock';

// ACTIONS
/**
 * fetch implanted experiments action
 * @returns {type, implantedExperiments}
 */
export const fetchImplantedExperiments = () => ({
  type: actionTypes.FETCH_IMPLANTED_EXPERIMENTS,
  implantedExperiments: implantedExperimentsMock,
});

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
