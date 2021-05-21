import actionTypes from './actionTypes';

const initialState = {
  compareResults: [],
  experimentsTrainingHistory: {},
};

const compareResultsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_COMPARE_RESULT:
      return {
        ...state,
        compareResults: [...state.compareResults, action.compareResult],
      };

    case actionTypes.DELETE_COMPARE_RESULT:
      return {
        ...state,
        compareResults: state.compareResults.filter(
          (compareResult) => compareResult.uuid !== action.id
        ),
      };

    case actionTypes.FETCH_COMPARE_RESULTS:
      return {
        ...state,
        compareResults: action.compareResults,
        experimentsOptions: action.experimentsOptions,
        experimentsTrainingHistory: {},
      };

    case actionTypes.FETCH_EXPERIMENTS_TRAINING_HISTORY:
      return {
        ...state,
        experimentsTrainingHistory: action.experimentsTrainingHistory,
      };

    case actionTypes.UPDATE_COMPARE_RESULT: {
      const updatedCompareResult = action.compareResult;
      const compareResultsAux = [...state.compareResults];
      const compareResultIndex = compareResultsAux.findIndex(
        (compareResult) => compareResult.uuid === updatedCompareResult.uuid
      );

      compareResultsAux[compareResultIndex] = updatedCompareResult;

      return {
        ...state,
        compareResults: compareResultsAux,
      };
    }

    case actionTypes.UPDATE_EXPERIMENTS_OPTIONS: {
      const experimentsOptionsAux = [...state.experimentsOptions];
      const experimentsOptionIndex = experimentsOptionsAux.findIndex(
        (experimentsOption) => experimentsOption.value === action.experimentId
      );

      experimentsOptionsAux[experimentsOptionIndex] = {
        ...experimentsOptionsAux[experimentsOptionIndex],
        children: action.children,
        loading: action.isLoading,
        disabled: action.children ? action.children.length === 0 : false,
      };

      return {
        ...state,
        experimentsOptions: experimentsOptionsAux,
      };
    }

    default:
      return state;
  }
};

export default compareResultsReducer;
