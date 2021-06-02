import actionTypes from './actionTypes';

const initialState = [];

const experimentRunsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.FETCH_EXPERIMENT_RUNS_SUCCESS:
      return [...action.runs];

    case actionTypes.CREATE_EXPERIMENT_RUN_SUCCESS:
      return [...state, { runId: action.runId }];

    case actionTypes.DELETE_EXPERIMENT_RUN_SUCCESS:
      return [...action.runs];

    case actionTypes.FETCH_EXPERIMENT_RUNS_FAIL:
      return [...state];

    case actionTypes.CREATE_EXPERIMENT_RUN_FAIL:
      return [...state];

    case actionTypes.DELETE_EXPERIMENT_RUN_FAIL:
      return [...state];

    default:
      return state;
  }
};

export default experimentRunsReducer;
