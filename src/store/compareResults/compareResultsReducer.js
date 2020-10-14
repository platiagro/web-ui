import actionTypes from './actionTypes';

const initialState = {
  addIsLoading: false,
  compareResults: [],
  deleteIsLoading: false,
  experimentsTrainingHistory: undefined,
};

const compareResultsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.ADD_COMPARE_RESULT_LOADER:
      return {
        ...state,
        addIsLoading: action.addIsLoading,
      };
    case actionTypes.ADD_COMPARE_RESULT:
      return {
        ...state,
        compareResults: [...state.compareResults, action.compareResult],
      };
    case actionTypes.DELETE_COMPARE_RESULT_LOADER:
      return {
        ...state,
        deleteIsLoading: action.deleteIsLoading,
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
      };
    case actionTypes.FETCH_EXPERIMENTS_TRAINING_HISTORY:
      return {
        ...state,
        experimentsTrainingHistory: action.experimentsTrainingHistory,
      };
    case actionTypes.UPDATE_COMPARE_RESULT:
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
    case actionTypes.SHOW_EDIT_TASK_MODAL:
      return {
        ...state,
        editModalIsVisible: true,
        newTaskRecord: action.newTaskRecord,
      };
    case actionTypes.SHOW_NEW_TASK_MODAL:
      return {
        ...state,
        modalIsVisible: true,
      };
    case actionTypes.ADD_TASK_FAIL:
    case actionTypes.UPDATE_TASK_FAIL:
      return {
        ...state,
        modalValidateStatus: 'error',
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

// EXPORT
export default compareResultsReducer;
