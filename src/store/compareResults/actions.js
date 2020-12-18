// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import compareResultsApi from 'services/CompareResultsApi';
import experimentRunsApi from 'services/ExperimentRunsApi';

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
    type: actionTypes.UPDATE_EXPERIMENTS_OPTIONS,
    experimentId: experimentId,
    children: children,
    isLoading: isLoading,
  };
};

/**
 * Function to add compare result and dispatch to reducer
 *
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
 *
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
 *
 * @param {string} projectId
 * @param {object[]} experiments
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
        dispatch(changeLoadingCompareResultsModal(false));
        let errorMessage = error.message;
        message.error(errorMessage, 5);
      });
  };
};

/**
 * Function to fetch the compare results results and dispatch to reducer
 *
 * @param {object} compareResult
 */
export const fetchCompareResultsResults = (compareResult) => async (
  dispatch
) => {
  const { projectId, experimentId, operatorId, runId } = compareResult;
  const figures = await experimentRunsApi
    .listOperatorFigures(projectId, experimentId, runId, operatorId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});

  const dataset = await experimentRunsApi
    .listOperatorDatasets(projectId, experimentId, runId, operatorId, 1)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});

  const metrics = await experimentRunsApi
    .listOperatorMetrics(projectId, experimentId, runId, operatorId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {});

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
  compareResultsAux.metrics = metrics ? metrics : [];
  dispatch({
    type: actionTypes.UPDATE_COMPARE_RESULT,
    compareResult: compareResultsAux,
  });
};

/**
 * Get compare result dataset paginated
 *
 * @param compareResult
 * @param page
 * @param pageSize
 */
export const getCompareResultDatasetPaginated = (
  compareResult,
  page,
  pageSize
) => (dispatch) => {
  dispatch({
    type: actionTypes.GET_COMPARE_RESULT_DATASET_PAGINATED_REQUEST,
  });

  const { projectId, experimentId, operatorId, runId } = compareResult;
  experimentRunsApi
    .listOperatorDatasets(projectId, experimentId, runId, operatorId, page, pageSize)
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
    .catch((error) => {
      dispatch({
        type: actionTypes.GET_COMPARE_RESULT_DATASET_PAGINATED_FAIL,
      });
    });
};

/**
 * Function to fetch the training history and dispatch to reducer
 *
 * @param projectId
 * @param {string} experimentId
 */
export const fetchTrainingHistory = (projectId, experimentId) => {
  return (dispatch, getState) => {
    const { compareResultsReducer } = getState();
    const trainingHistory = compareResultsReducer.experimentsTrainingHistory;
    if (!trainingHistory.hasOwnProperty(experimentId)) {
      dispatch(updateExperimentsOptions(experimentId, null, true));
      return experimentRunsApi
        .fetchExperimentRuns(projectId, experimentId)
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
