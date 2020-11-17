// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import compareResultsApi from 'services/CompareResultsApi';
import pipelinesApi from 'services/PipelinesApi';

// UI ACTIONS
import {
  changeLoadingCompareResultsModal,
  setAddLoaderCompareResultsModal,
  setDeleteLoaderCompareResultsModal,
} from 'store/ui/actions';

// UTILS
import utils from 'utils';

/**
 * Function to update experiments options data
 *
 * @param {string} experimentId
 * @param {object[]} children
 * @param {boolean} isLoading
 */
const updateExperimentsOptions = (experimentId, children, isLoading) => {
  return {
    type: actionTypes.UPDATE_EXPERIMENTS_OPTIONS_REQUEST,
    experimentId: experimentId,
    children: children,
    isLoading: isLoading,
  };
};

export const addCompareResultSuccess = (response) => (dispatch) => {
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.ADD_COMPARE_RESULT_SUCCESS,
    compareResult: response.data,
  });
}

export const addCompareResultFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.ADD_COMPARE_RESULT_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
}


/**
 * Function to add compare result and dispatch to reducer
 *
 * @param {string} projectId
 */
export const addCompareResult = (projectId) => {
  return (dispatch) => {
    dispatch({type: actionTypes.ADD_COMPARE_RESULT_REQUEST});
    dispatch(setAddLoaderCompareResultsModal(true));
    compareResultsApi
      .createCompareResult(projectId)
      .then((response) => {
        dispatch(
          setAddLoaderCompareResultsModal(false),
          addCompareResultSuccess(response)
        );
      })
      .catch((error) => {
        dispatch(
          setAddLoaderCompareResultsModal(false),
          addCompareResultFail(error)
        );
      });
  };
};

export const deleteCompareResultSuccess = () => (dispatch) => {
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.ADD_COMPARE_RESULT_SUCCESS
  });
}

export const deleteCompareResultFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.ADD_COMPARE_RESULT_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
}


/**
 * Function to delete compare result and dispatch to reducer
 *
 * @param {string} projectId
 * @param {string} id
 */
export const deleteCompareResult = (projectId, id) => {
  return (dispatch) => {
    dispatch({type: actionTypes.DELETE_COMPARE_RESULT_REQUEST});
    dispatch(setDeleteLoaderCompareResultsModal(true));
    compareResultsApi
      .deleteCompareResult(projectId, id)
      .then((response) => {
        dispatch(setDeleteLoaderCompareResultsModal(false));
        dispatch(deleteCompareResultSuccess);
      })
      .catch((error) => {
        dispatch(setDeleteLoaderCompareResultsModal(false));
        dispatch(deleteCompareResultFail(error));
      });
  };
};


export const fetchCompareResultsSuccess = () => (dispatch) => {
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.FETCH_COMPARE_RESULT_SUCCESS
  });
}

export const fetchCompareResultsFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.FETCH_COMPARE_RESULT_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
}
/**
 * Function to fetch compare results and dispatch to reducer
 *
 * @param {string} projectId
 * @param {object[]} experiments
 */
export const fetchCompareResults = (projectId, experiments) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.FETCH_COMPARE_RESULTS_REQUEST
    });
    dispatch(changeLoadingCompareResultsModal(true));
    compareResultsApi
      .listCompareResult(projectId)
      .then(async (response) => {
        const compareResults = response.data;
        dispatch(changeLoadingCompareResultsModal(false));
        dispatch({
          type: actionTypes.FETCH_COMPARE_RESULTS,
          compareResults: compareResults,
          experimentsOptions: experiments.map((experiment) => {
            return {
              isLeaf: false,
              label: experiment.name,
              value: experiment.uuid,
            };
          }),
        });
        dispatch(fetchCompareResultsSuccess)

        for (const compareResult of compareResults) {
          if (compareResult.experimentId) {
            await dispatch(fetchTrainingHistory(compareResult.experimentId));
          }
        }
      })
      .catch((error) => {
        dispatch(changeLoadingCompareResultsModal(false));
        dispatch(fetchCompareResultsFail(error));
      });
  };
};


export const fetchCompareResultsResultsSuccess = () => (dispatch) => {
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.FETCH_COMPARE_RESULT_SUCCESS
  });
}

export const fetchCompareResultsResultsFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.FETCH_COMPARE_RESULT_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
}

/**
 * Function to fetch the compare results results and dispatch to reducer
 *
 * @param {object} compareResult
 */
export const fetchCompareResultsResults = (compareResult) => async (
  dispatch
) => {

  dispatch({
    type: actionTypes.FETCH_COMPARE_RESULTS_REQUEST
  });
  const { experimentId, operatorId, runId } = compareResult;
  const figures = await pipelinesApi
    .getOperatorFigures(experimentId, runId, operatorId)
    .then((response) => {
      fetchCompareResultsResultsSuccess();
      return response.data;
    })
    .catch((error) => {
      fetchCompareResultsResultsFail(error);
    });

  const dataset = await pipelinesApi
    .getOperatorDataset(experimentId, runId, operatorId, 1)
    .then((response) => {
      fetchCompareResultsResultsSuccess();
      return response.data;
    })
    .catch((error) => {
      fetchCompareResultsResultsFail(error);
    });

  const metrics = await pipelinesApi
    .getOperatorMetrics(experimentId, runId, operatorId)
    .then((response) => {
      fetchCompareResultsResultsSuccess();
      return response.data;
    })
    .catch((error) => {
      fetchCompareResultsResultsFail(error);
    });

  const results = utils.transformResults(operatorId, figures);
  if (dataset) {
    let tableColumns = [];
    let index = 0;
    for (let column of dataset.data.columns) {
      let tableColumn = {
        title: column,
        dataIndex: index,
      };
      tableColumns.push(tableColumn);
      index++;
    }

    results.push({
      type: 'table',
      uuid: `table-${operatorId}`,
      resultTable: {
        columns: tableColumns,
        rows: dataset.data.data,
        total: dataset.data.total,
        currentPage: 1,
      },
    });
  }

  const compareResultsAux = { ...compareResult };
  compareResultsAux.metrics = metrics ? metrics : [];
  compareResultsAux.results = results;
  dispatch({
    type: actionTypes.UPDATE_COMPARE_RESULT_REQUEST,
    compareResult: compareResultsAux,
  });
};

export const fetchTrainingHistorySuccess = (trainingHistory) => (dispatch) => {
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.FETCH_EXPERIMENTS_TRAINING_RESULT_SUCCESS,
    experimentsTrainingHistory: trainingHistory,
  });
}

export const fetchTrainingHistoryFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.FETCH_EXPERIMENTS_TRAINING_RESULT_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
}


/**
 * Function to fetch the training history and dispatch to reducer
 *
 * @param {string} experimentId
 */
export const fetchTrainingHistory = (experimentId) => {
  return (dispatch, getState) => {

    dispatch({
      type: actionTypes.FETCH_EXPERIMENTS_TRAINING_RESULT_REQUEST,
    });

    const { compareResultsReducer } = getState();
    const trainingHistory = compareResultsReducer.experimentsTrainingHistory;
    if (!trainingHistory.hasOwnProperty(experimentId)) {
      dispatch(updateExperimentsOptions(experimentId, null, true));
      return pipelinesApi
        .getTrainingHistory(experimentId)
        .then((response) => {
          trainingHistory[experimentId] = response.data;
          dispatch(fetchTrainingHistorySuccess(trainingHistory));
          const children = response.data.map((history) => {
            return {
              label: utils.formatCompareResultDate(history.createdAt),
              value: history.runId,
            };
          });
          dispatch(updateExperimentsOptions(experimentId, children, false));
        })
        .catch((error) => {
          dispatch(updateExperimentsOptions(experimentId, null, false));
          dispatch(fetchTrainingHistoryFail(error));
        });
    }
  };
};


export const updateCompareFail = (error) => (dispatch) => {
  const errorMessage = error.message;
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.UPDATE_COMPARE_FAIL,
    errorMessage,
  });
  message.error(errorMessage, 5);
}

export const updateCompareSuccess = (response) => (dispatch) => {
  // dispatching create dataset fail
  dispatch({
    type: actionTypes.UPDATE_COMPARE_SUCCESS,
    compareResult: response.data,
  });
}


/**
 * Function to update compare result and dispatch to reducer
 *
 * @param {object} compareResult
 * @param {boolean} changedPosition
 */
export const updateCompareResult = (compareResult, changedPosition) => {
  return (dispatch) => {
    const body = {
      experimentId: compareResult.experimentId,
      operatorId: compareResult.operatorId,
      runId: compareResult.runId,
      layout: compareResult.layout,
    };
    compareResultsApi
      .updateCompareResult(compareResult.projectId, compareResult.uuid, body)
      .then((response) => {
        if (!changedPosition) {
          dispatch(updateCompareSuccess(response));
        }
      })
      .catch((error) => {
       dispatch(updateCompareFail(error));
      });
  };
};
