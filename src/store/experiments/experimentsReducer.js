// ACTION TYPES
import actionTypes from './actionTypes';
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
    case actionTypes.CLEAR_ALL_EXPERIMENTS:
      return [];
    
    // SUCCESS
    // fetch experiments success
    case actionTypes.FETCH_EXPERIMENTS_SUCCESS:
      return [...action.experiments];
    // create experiment success
    case actionTypes.CREATE_EXPERIMENT_SUCCESS:
      return [...state, action.experiment];
    // edit experiment name success
    case actionTypes.UPDATE_EXPERIMENT_SUCCESS:
      return [...action.experiments];
    // delete experiment success
    case actionTypes.DELETE_EXPERIMENT_SUCCESS:
      return [...action.experiments];
    // organize experiments success
    case actionTypes.ORGANIZE_EXPERIMENTS_SUCCESS:
      return [...action.experiments];

    // // // // // // //

    // FAIL
    // fetch experiments fail
    case actionTypes.FETCH_EXPERIMENTS_FAIL:
      return [...state];
    // create experiment fail
    case actionTypes.CREATE_EXPERIMENT_FAIL:
      return [...state];
    // update experiment fail
    case actionTypes.UPDATE_EXPERIMENT_FAIL:
      return [...state];
    // delete experiment fail
    case actionTypes.DELETE_EXPERIMENT_FAIL:
      return [...state];
    // organize experiments fail
    case actionTypes.ORGANIZE_EXPERIMENTS_FAIL:
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
 * @param {object} state
 * @param {string} experimentId Experiment UUID
 * @returns {Array}
 */
export const getExperimentById = (state, experimentId) => {
  return state.experimentsReducer.filter((experiment) => {
    if (experiment.uuid == experimentId) {
      return experiment
    }
  });
}

// EXPORT
export default experimentsReducer;
