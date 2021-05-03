// ACTION TYPES
import EXPERIMENTS_TYPES from './experiments.actionTypes';
import experimentRunsActionTypes from './experimentRuns/actionTypes';

// INITIAL STATE
const initialState = [];

/**
 * experiments reducer
 *
 * @param state
 * @param action
 * @returns {Array} Experiments list
 */
const experimentsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    //reset initial fetch of experiments
    case EXPERIMENTS_TYPES.CLEAR_ALL_EXPERIMENTS:
      return [];

    // SUCCESS
    // fetch experiments success
    case EXPERIMENTS_TYPES.FETCH_EXPERIMENTS_SUCCESS:
      return [...action.experiments];
    // create experiment success
    case EXPERIMENTS_TYPES.CREATE_EXPERIMENT_SUCCESS:
      return [...state, action.experiment];
    // edit experiment name success
    case EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_SUCCESS:
      return [...action.experiments];
    // delete experiment success
    case EXPERIMENTS_TYPES.DELETE_EXPERIMENT_SUCCESS:
      return [...action.experiments];
    // organize experiments success
    case EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_SUCCESS:
      return [...action.experiments];

    // // // // // // //

    // FAIL
    // fetch experiments fail
    case EXPERIMENTS_TYPES.FETCH_EXPERIMENTS_FAIL:
      return [...state];
    // create experiment fail
    case EXPERIMENTS_TYPES.CREATE_EXPERIMENT_FAIL:
      return [...state];
    // update experiment fail
    case EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_FAIL:
      return [...state];
    // delete experiment fail
    case EXPERIMENTS_TYPES.DELETE_EXPERIMENT_FAIL:
      return [...state];
    // organize experiments fail
    case EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_FAIL:
      return [...state];

    // // // // // // //

    // EXPERIMENT RUNS
    case experimentRunsActionTypes.EXPERIMENT_RUN_SUCCEEDED:
      return [...action.experiments];
    case experimentRunsActionTypes.EXPERIMENT_RUN_NOT_SUCCEEDED:
      return [...action.experiments];

    // DEFAULT
    default:
      return state;
  }
};

// SELECTOR

/**
 * Select experiment by id
 *
 * @param {object} state state
 * @param {string} experimentId Experiment UUID
 * @returns {object} The specified experiment, or an empty object
 */
export const getExperimentById = (state, experimentId) => {
  const experiment = state.experimentsReducer.find(
    (exp) => exp.uuid === experimentId
  );
  return experiment ? experiment : {};
};

// EXPORT
export default experimentsReducer;
