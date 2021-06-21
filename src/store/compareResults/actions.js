import { message } from 'antd';

import utils from 'utils';
import { showError } from 'store/message';
import { Selectors } from 'store/projects/experiments';
import { addLoading, removeLoading } from 'store/loading';
import compareResultsApi from 'services/CompareResultsApi';
import experimentRunsApi from 'services/ExperimentRunsApi';

import actionTypes from './actionTypes';

const { getExperiments } = Selectors;

/**
 * Function to update experiments options data
 *
 * @param {string} experimentId Experiment Id
 * @param {object[]} children Children elements
 * @param {boolean} isLoading Is loading
 * @returns {object} Experiment Options
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
 *
 * @param {string} projectId Project Id
 * @returns {Function} DIspatch function
 */
export const addCompareResult = (projectId) => {
  return (dispatch) => {
    dispatch(addLoading(actionTypes.ADD_COMPARE_RESULT));

    compareResultsApi
      .createCompareResult(projectId)
      .then((response) => {
        dispatch({
          type: actionTypes.ADD_COMPARE_RESULT,
          compareResult: response.data,
        });
      })
      .catch((error) => {
        let errorMessage = error.message;
        message.error(errorMessage, 5);
      })
      .finally(() => {
        dispatch(removeLoading(actionTypes.ADD_COMPARE_RESULT));
      });
  };
};

/**
 * Function to delete compare result and dispatch to reducer
 *
 * @param {string} projectId Project Id
 * @param {string} id COmpare result Id
 * @returns {Function} Dispatch function
 */
export const deleteCompareResult = (projectId, id) => {
  return (dispatch) => {
    dispatch(addLoading(actionTypes.DELETE_COMPARE_RESULT));

    compareResultsApi
      .deleteCompareResult(projectId, id)
      .then(() => {
        dispatch({
          type: actionTypes.DELETE_COMPARE_RESULT,
          id,
        });
      })
      .catch((error) => {
        let errorMessage = error.message;
        message.error(errorMessage, 5);
      })
      .finally(() => {
        dispatch(removeLoading(actionTypes.DELETE_COMPARE_RESULT));
      });
  };
};

/**
 * Function to fetch compare results and dispatch to reducer
 *
 * @param {string} projectId Project Id
 * @returns {Function} DIspatch function
 */
export const fetchCompareResults = (projectId) => (dispatch, getState) => {
  dispatch(addLoading(actionTypes.FETCH_COMPARE_RESULTS));

  const state = getState();
  const experiments = getExperiments(state, projectId);

  compareResultsApi
    .listCompareResult(projectId)
    .then(async (response) => {
      const compareResults = response.data.comparisons;
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
          await dispatch(
            fetchTrainingHistory(
              compareResult.projectId,
              compareResult.experimentId
            )
          );
        }
      }
    })
    .catch((error) => {
      let errorMessage = error.message;
      message.error(errorMessage, 5);
    })
    .finally(() => {
      dispatch(removeLoading(actionTypes.FETCH_COMPARE_RESULTS));
    });
};

/**
 * Function to fetch the compare results results and dispatch to reducer
 *
 * @param {object} compareResult Compare result
 * @returns {Function} Dispatch function
 */
export const fetchCompareResultsResults =
  (compareResult) => async (dispatch) => {
    try {
      const { projectId, experimentId, operatorId, runId } = compareResult;

      const figures = await experimentRunsApi
        .listOperatorFigures(projectId, experimentId, runId, operatorId)
        .then((response) => {
          return response.data;
        });

      const dataset = await experimentRunsApi
        .listOperatorDatasets(projectId, experimentId, runId, operatorId, 1)
        .then((response) => {
          return response.data;
        });

      const figureResults = utils.transformResults(operatorId, figures);
      let datasetResult = null;
      if (dataset) {
        // create columns in antd format
        let tableColumns = [];
        let index = 0;
        for (let column of dataset.columns) {
          let tableColumn = {
            title: column,
            dataIndex: index,
          };
          tableColumns.push(tableColumn);
          index++;
        }
        datasetResult = {
          uuid: `table-${operatorId}`,
          columns: tableColumns,
          currentPage: 1,
          pageSize: 10,
          rows: dataset.data,
          total: dataset.total,
        };
      }

      const compareResultsAux = { ...compareResult };
      compareResultsAux.dataset = datasetResult ? datasetResult : null;
      compareResultsAux.figures = figureResults ? figureResults : [];

      compareResultsAux.resultsFetched = datasetResult || figureResults;

      dispatch({
        type: actionTypes.UPDATE_COMPARE_RESULT,
        compareResult: compareResultsAux,
      });
    } catch (e) {
      dispatch(showError(e.message));
    }
  };

/**
 * Get compare result dataset paginated
 *
 * @param {object} compareResult Compare result
 * @param {number} page Page number
 * @param {number} pageSize Page size
 * @returns {Function} Dispatch function
 */
export const getCompareResultDatasetPaginated =
  (compareResult, page, pageSize) => (dispatch) => {
    dispatch({
      type: actionTypes.GET_COMPARE_RESULT_DATASET_PAGINATED_REQUEST,
    });

    const { projectId, experimentId, operatorId, runId } = compareResult;
    experimentRunsApi
      .listOperatorDatasets(
        projectId,
        experimentId,
        runId,
        operatorId,
        page,
        pageSize
      )
      .then((response) => {
        let newDatasetResult = null;
        if (response) {
          const responseData = response.data;
          // create columns in antd format
          let tableColumns = [];
          let index = 0;
          for (let column of responseData.columns) {
            let tableColumn = {
              title: column,
              dataIndex: index,
            };
            tableColumns.push(tableColumn);
            index++;
          }
          newDatasetResult = {
            uuid: `table-${operatorId}`,
            columns: tableColumns,
            currentPage: page,
            pageSize: pageSize,
            rows: responseData.data,
            total: responseData.total,
          };
          const compareResultsAux = { ...compareResult };
          compareResultsAux.dataset = newDatasetResult;
          dispatch({
            type: actionTypes.UPDATE_COMPARE_RESULT,
            compareResult: compareResultsAux,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: actionTypes.GET_COMPARE_RESULT_DATASET_PAGINATED_FAIL,
        });
      });
  };

/**
 * Function to fetch the training history and dispatch to reducer
 *
 * @param {string} projectId Project Id
 * @param {string} experimentId Experiment id
 * @returns {Function} DIspatch function
 */
export const fetchTrainingHistory = (projectId, experimentId) => {
  return (dispatch, getState) => {
    const { compareResultsReducer } = getState();
    const trainingHistory = compareResultsReducer.experimentsTrainingHistory;
    // eslint-disable-next-line no-prototype-builtins
    if (!trainingHistory.hasOwnProperty(experimentId)) {
      dispatch(updateExperimentsOptions(experimentId, null, true));
      return experimentRunsApi
        .fetchExperimentRuns(projectId, experimentId)
        .then((response) => {
          trainingHistory[experimentId] = response.data.runs;
          dispatch({
            type: actionTypes.FETCH_EXPERIMENTS_TRAINING_HISTORY,
            experimentsTrainingHistory: trainingHistory,
          });
          const children = response.data.runs.map((history) => {
            return {
              label: utils.formatCompareResultDate(history.createdAt),
              value: history.uuid,
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
 *
 * @param {object} compareResult Compare result
 * @param {boolean} isToDispachAction Is to dispatch function
 * @returns {Function} Dispatch function
 */
export const updateCompareResult = (compareResult, isToDispachAction) => {
  return (dispatch) => {
    const body = {
      experimentId: compareResult.experimentId,
      operatorId: compareResult.operatorId,
      activeTab: compareResult.activeTab,
      runId: compareResult.runId,
      layout: compareResult.layout,
    };
    compareResultsApi
      .updateCompareResult(compareResult.projectId, compareResult.uuid, body)
      .then((response) => {
        if (isToDispachAction) {
          dispatch({
            type: actionTypes.UPDATE_COMPARE_RESULT,
            compareResult: response.data,
          });
        }
      })
      .catch((error) => {
        let errorMessage = error.message;
        message.error(errorMessage, 5);
      });
  };
};
