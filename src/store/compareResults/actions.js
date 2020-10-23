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
 * @param {String} experimentId
 * @param {Object[]} children
 * @param {Boolean} isLoading
 */
const updateExperimentsOptions = (experimentId, children, isLoading) => {
  return {
    type: actionTypes.UPDATE_EXPERIMENTS_OPTIONS,
    experimentId: experimentId,
    children: children,
    isLoading: isLoading,
  };
};

/**
 * Function to add compare result and dispatch to reducer
 * @param {string} projectId
 */
export const addCompareResult = (projectId) => {
  return (dispatch) => {
    dispatch(setAddLoaderCompareResultsModal(true));
    compareResultsApi
      .createCompareResult(projectId)
      .then((response) => {
        dispatch(setAddLoaderCompareResultsModal(false));
        dispatch({
          type: actionTypes.ADD_COMPARE_RESULT,
          compareResult: response.data,
        });
      })
      .catch((error) => {
        dispatch(setAddLoaderCompareResultsModal(false));
        let errorMessage = error.message;
        message.error(errorMessage, 5);
      });
  };
};

/**
 * Function to delete compare result and dispatch to reducer
 * @param {string} projectId
 * @param {string} id
 */
export const deleteCompareResult = (projectId, id) => {
  return (dispatch) => {
    dispatch(setDeleteLoaderCompareResultsModal(true));
    compareResultsApi
      .deleteCompareResult(projectId, id)
      .then((response) => {
        dispatch(setDeleteLoaderCompareResultsModal(false));
        dispatch({
          type: actionTypes.DELETE_COMPARE_RESULT,
          id,
        });
      })
      .catch((error) => {
        dispatch(setDeleteLoaderCompareResultsModal(false));
        let errorMessage = error.message;
        message.error(errorMessage, 5);
      });
  };
};

/**
 * Function to fetch compare results and dispatch to reducer
 * @param {string} projectId
 * @param {Object[]} experiments
 */
export const fetchCompareResults = (projectId, experiments) => {
  return (dispatch) => {
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

        for (const compareResult of compareResults) {
          if (compareResult.experimentId) {
            await dispatch(fetchTrainingHistory(compareResult.experimentId));
          }
        }
      })
      .catch((error) => {
        dispatch(changeLoadingCompareResultsModal(false));
        let errorMessage = error.message;
        message.error(errorMessage, 5);
      });
  };
};

/**
 * Function to fetch the compare results results and dispatch to reducer
 * @param {Object} compareResult
 */
export const fetchCompareResultsResults = (compareResult) => async (
  dispatch
) => {
  const { experimentId, operatorId, runId } = compareResult;
  const figures = await pipelinesApi
    .getOperatorFigures(experimentId, runId, operatorId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});

  const dataset = await pipelinesApi
    .getOperatorDataset(experimentId, runId, operatorId, 1)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});

  const metrics = await pipelinesApi
    .getOperatorMetrics(experimentId, runId, operatorId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});

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
    type: actionTypes.UPDATE_COMPARE_RESULT,
    compareResult: compareResultsAux,
  });
};

/**
 * Function to fetch the training history and dispatch to reducer
 * @param {String} experimentId
 */
export const fetchTrainingHistory = (experimentId) => {
  return (dispatch, getState) => {
    const { compareResultsReducer } = getState();
    const trainingHistory = compareResultsReducer.experimentsTrainingHistory;
    if (!trainingHistory.hasOwnProperty(experimentId)) {
      dispatch(updateExperimentsOptions(experimentId, null, true));
      return pipelinesApi
        .getTrainingHistory(experimentId)
        .then((response) => {
          trainingHistory[experimentId] = response.data;
          dispatch({
            type: actionTypes.FETCH_EXPERIMENTS_TRAINING_HISTORY,
            experimentsTrainingHistory: trainingHistory,
          });
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
          let errorMessage = error.message;
          message.error(errorMessage, 5);
        });
    }
  };
};

/**
 * Function to update compare result and dispatch to reducer
 * @param {Object} compareResult
 */
export const updateCompareResult = (compareResult) => {
  return (dispatch) => {
    const body = {
      experimentId: compareResult.experimentId,
      operatorId: compareResult.operatorId,
      runId: compareResult.runId,
    };
    compareResultsApi
      .updateCompareResult(compareResult.projectId, compareResult.uuid, body)
      .then((response) => {
        dispatch(changeLoadingCompareResultsModal(false));
        dispatch({
          type: actionTypes.UPDATE_COMPARE_RESULT,
          compareResult: response.data,
        });
      })
      .catch((error) => {
        dispatch(changeLoadingCompareResultsModal(false));
        let errorMessage = error.message;
        message.error(errorMessage, 5);
      });
  };
};
