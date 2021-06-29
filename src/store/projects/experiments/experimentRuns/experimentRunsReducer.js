import actionTypes from './actionTypes';

const initialState = [];

/**
 * Experiment runs reducer
 *
 * @param {object} state Current State
 * @param {object} action Action
 * @returns {object} New state
 */
const experimentRunsReducer = (state = initialState, action = undefined) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_EXPERIMENT_RUNS_SUCCESS:
      return [...action.runs];

    case actionTypes.CREATE_EXPERIMENT_RUN_SUCCESS:
      return [...state, { runId: payload.runId }];

    case actionTypes.DELETE_EXPERIMENT_RUN_SUCCESS:
      return [...action.runs];

    default:
      return state;
  }
};

export default experimentRunsReducer;
