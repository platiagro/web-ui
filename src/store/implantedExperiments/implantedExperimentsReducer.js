// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = [];

const implantedExperimentsReducer = (
  state = initialState,
  action = undefined
) => {
  switch (action.type) {
    case actionTypes.DELETE_IMPLANTED_EXPERIMENT:
      return state.filter((implantedExperiment) => {
        return implantedExperiment.experimentId !== action.experimentId;
      });
    case actionTypes.FETCH_IMPLANTED_EXPERIMENTS:
      return [...action.implantedExperiments];
    default:
      return state;
  }
};

// EXPORT
export default implantedExperimentsReducer;
