// FIXME: quando criamos um novo experimento o menu de templates está travando

/* eslint-disable import/no-cycle */
/**
 * Actions for experiment details
 */
import {
  uploadDataset as uploadDatasetService,
  getHeaderColumns,
  updateColumn,
} from '../../services/dataSetApi';
import { showLoader, hideLoader } from './drawerActions';

import * as projectsServices from '../../services/projectsApi';

import { getProject } from './projectActions';

export const EXPERIMENT_FETCH_STARTED = 'EXPERIMENT_FETCH_STARTED';
export const EXPERIMENT_FETCH = 'EXPERIMENT_FETCH';
export const EXPERIMENT_UPDATE = 'EXPERIMENT_UPDATE';
export const EXPERIMENT_UPDATE_NAME = 'EXPERIMENT_UPDATE_NAME';

export const EXPERIMENT_SET_COLUMNS = 'EXPERIMENT_SET_COLUMNS';
export const EXPERIMENT_SET_RUN_STATUS = 'EXPERIMENT_SET_RUN_STATUS';
export const EXPERIMENT_SET_SELECTED_DRAWER = 'EXPERIMENT_SET_SELECTED_DRAWER';
export const EXPERIMENT_SET_TASK_STATUS = 'EXPERIMENT_SET_TASK_STATUS';

export const EXPERIMENT_SET_GROUP = 'EXPERIMENT_SET_GROUP';
export const EXPERIMENT_SET_PERIOD = 'EXPERIMENT_SET_PERIOD';
export const EXPERIMENT_SET_CUT_OFF_PRE_1 = 'EXPERIMENT_SET_CUT_OFF_PRE_1';
export const EXPERIMENT_SET_CORRELATION_PRE_1 =
  'EXPERIMENT_SET_CORRELATION_PRE_1';
export const EXPERIMENT_SET_CUT_OFF_PRE_2 = 'EXPERIMENT_SET_CUT_OFF_PRE_2';
export const EXPERIMENT_SET_CORRELATION_PRE_2 =
  'EXPERIMENT_SET_CORRELATION_PRE_2';
export const EXPERIMENT_SET_FILTER = 'EXPERIMENT_SET_FILTER';
export const EXPERIMENT_SET_AUTOML = 'EXPERIMENT_SET_AUTOML';
export const EXPERIMENT_SET_TARGET = 'EXPERIMENT_SET_TARGET';
export const EXPERIMENT_SET_TEMPLATE = 'EXPERIMENT_SET_TEMPLATE';

export const EXPERIMENT_UPLOAD_DATASET = 'EXPERIMENT_UPLOAD_DATASET';
export const EXPERIMENT_SET_COLUMN_TYPE = 'EXPERIMENT_SET_COLUMN_TYPE';
export const EXPERIMENT_CLEAR_SELECTED_TASK = 'EXPERIMENT_CLEAR_SELECTED_TASK';

// default experiment template parameters
const experimentTemplateParameters = {
  atributos_tempo: {
    group: [],
    period: null,
  },
  pre_selecao1: { cutoff: 0.1, correlation: 0.7 },
  pre_selecao2: { cutoff: 0.1, correlation: 0.7 },
  filtro_atributos: [],
  automl: { time: 3 },
  conjunto_dados: {
    target: undefined,
    datasetId: null,
    txtName: null,
    csvName: null,
  },
};

/**
 * Function to dispatch action EXPERIMENT_FETCH
 */
export const fetchStarted = () => {
  return {
    type: EXPERIMENT_FETCH_STARTED,
  };
};

/**
 * Function to dispatch action PROJECT_FETCH_DETAIL
 * @param {Object} project
 */
export const setExperimentDetails = (experiment) => {
  return {
    type: EXPERIMENT_FETCH,
    experiment,
  };
};

/**
 * Async action to fetch experiment dataset
 * @param {String} projectId
 * @param {String} experimentId
 */
export const getExperiment = (projectId, experimentId) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return projectsServices
      .getExperiment(projectId, experimentId)
      .then(async (experiment) => {
        if (experiment) {
          const { headerId } = experiment.data.payload;

          getHeaderColumns(headerId).then((responseColumns) => {
            const { payload: columns } = responseColumns.data;

            const experimentDetails = {
              ...experiment.data.payload,
              columns,
            };

            dispatch(setExperimentDetails(experimentDetails));
          });
        } else dispatch(setExperimentDetails({}));
      });
  };
};

/**
 * Function to update project experiment and dispatch to reducer
 * @param {String} projectId
 * @param {String} experimentId
 * @param {Object} body
 */
export const updateExperiment = (projectId, experimentId, body) => {
  return (dispatch) => {
    return projectsServices
      .updateExperiment(projectId, experimentId, body)
      .then((response) => {
        if (response) {
          dispatch(getExperiment(projectId, experimentId));
        }
      });
  };
};

/**
 * Function to dispatch action EXPERIMENT_UPDATE_NAME
 */
export const setExperimentName = (name) => {
  return {
    type: EXPERIMENT_UPDATE_NAME,
    name,
  };
};

/**
 * Function to update experiment name and dispatch to reducer
 * @param {Object} editableDetails
 * @param {String} name
 */
export const updateExperimentName = (editableDetails, name) => {
  const { uuid, projectId } = editableDetails;
  return (dispatch) => {
    return projectsServices
      .updateExperiment(projectId, uuid, { name })
      .then((response) => {
        if (response) {
          dispatch(setExperimentName(name));
          dispatch(getProject(projectId));
          return true;
        }
        return false;
      });
  };
};

// FIXME: quando entramos em um experimento, o run status está sendo excluído
export const setRunStatus = (status) => {
  return {
    type: EXPERIMENT_SET_RUN_STATUS,
    status,
  };
};

export const setSelectedDrawer = (selected) => {
  return {
    type: EXPERIMENT_SET_SELECTED_DRAWER,
    selected,
  };
};

export const setTaskStatus = (status) => {
  return {
    type: EXPERIMENT_SET_GROUP,
    status,
  };
};

export const setGroup = (group) => {
  return {
    type: EXPERIMENT_SET_GROUP,
    group,
  };
};

export const setPeriod = (period) => {
  return {
    type: EXPERIMENT_SET_PERIOD,
    period,
  };
};

export const setCutoffPre1 = (cutOffPre1) => {
  return {
    type: EXPERIMENT_SET_CUT_OFF_PRE_1,
    cutOffPre1,
  };
};

export const setCorrelationPre1 = (correlationPre1) => {
  return {
    type: EXPERIMENT_SET_CORRELATION_PRE_1,
    correlationPre1,
  };
};

export const setCutoffPre2 = (cutOffPre2) => {
  return {
    type: EXPERIMENT_SET_CUT_OFF_PRE_2,
    cutOffPre2,
  };
};

export const setCorrelationPre2 = (correlationPre2) => {
  return {
    type: EXPERIMENT_SET_CORRELATION_PRE_2,
    correlationPre2,
  };
};

export const setFilter = (filter) => {
  return {
    type: EXPERIMENT_SET_FILTER,
    filter,
  };
};

export const setAutoML = (automl) => {
  return {
    type: EXPERIMENT_SET_AUTOML,
    automl,
  };
};

/**
 * Dispatch to clear selected task
 */
export const clearSelected = () => {
  // const to deselect tasks
  const selected = {
    conjunto_dados: false,
    atributos_tempo: false,
    pre_selecao1: false,
    atributos_genericos: false,
    pre_selecao2: false,
    filtro_atributos: false,
    automl: false,
    regression: false,
  };

  return {
    type: EXPERIMENT_CLEAR_SELECTED_TASK,
    selected,
  };
};

// FIXME: adicionar loading ao selecionar tipo da coluna
/**
 * Dispatch to set dataset column type
 * @param {String} columnType
 * @param {number} columnPosition
 */
export const setColumnTypeSuccess = (columnType, columnPosition) => {
  return {
    type: EXPERIMENT_SET_COLUMN_TYPE,
    columnType,
    columnPosition,
  };
};

/**
 * Async action to set dataset column type
 * @param {String} headerId
 * @param {String} columnId
 * @param {String} columnType
 * @param {number} columnPosition
 */
export const setColumnType = (
  headerId,
  columnId,
  columnType,
  columnPosition
) => {
  return (dispatch) => {
    return updateColumn(headerId, columnId, columnType).then(() => {
      dispatch(setColumnTypeSuccess(columnType, columnPosition));
    });
  };
};

/**
 * Dispatch to set experiment target success
 * @param {String} newExperimentDetails
 */
export const setTargetSuccess = (newExperimentDetails) => {
  return {
    type: EXPERIMENT_SET_TARGET,
    newExperimentDetails,
  };
};

/**
 * Async action to set experiment target
 * @param {String} projectId
 * @param {Object} experimentId
 * @param {Object} targetColumnId
 * @param {Object} parameters
 */
export const setTarget = (
  projectId,
  experimentId,
  targetColumnId,
  parameters
) => {
  return (dispatch) => {
    const newParameters = { ...parameters };
    newParameters.conjunto_dados.target = targetColumnId;

    projectsServices
      .updateExperiment(projectId, experimentId, {
        targetColumnId,
        parameters: JSON.stringify(newParameters),
      })
      .then(() => {
        dispatch(
          setTargetSuccess({ targetColumnId, parameters: newParameters })
        );
      });
  };
};

/**
 * Dispatch to set experiment template success
 * @param {Object} newExperimentDetails
 */
export const setTemplateSuccess = (newExperimentDetails) => {
  return {
    type: EXPERIMENT_SET_TEMPLATE,
    newExperimentDetails,
  };
};

// FIXME: adicionar loading ao selecionar template
/**
 * Async action to set experiment template
 * @param {String} projectId
 * @param {Object} experimentId
 * @param {Object} template
 */
export const setTemplate = (projectId, experimentId, template) => {
  return (dispatch) => {
    const {
      databaseName: templateName,
      pipelineDeployId: pipelineIdDeploy,
      pipelineTrainId: pipelineIdTrain,
    } = template;

    const templateDetails = {
      template: templateName,
      pipelineIdDeploy,
      pipelineIdTrain,
      datasetId: null,
      headerId: null,
      targetColumnId: null,
      runId: null,
      runStatus: null,
    };

    const newExperimentDetails = { ...templateDetails };

    projectsServices
      .updateExperiment(projectId, experimentId, {
        ...newExperimentDetails,
        parameters: JSON.stringify(experimentTemplateParameters),
      })
      .then(() => {
        dispatch(
          setTemplateSuccess({
            ...newExperimentDetails,
            parameters: experimentTemplateParameters,
            columns: [],
          })
        );
      });
  };
};

/**
 * Dispatch to upload dataset success
 * @param {Object} newExperimentDetails
 */
export const uploadDatasetSuccess = (newExperimentDetails) => ({
  type: EXPERIMENT_UPLOAD_DATASET,
  newExperimentDetails,
});

// FIXME: remover experimentId do form e adicionar como parametro da função
/**
 * Async action to upload dataset
 * @param {String} projectId
 * @param {Object} form
 */
export const uploadDataset = (projectId, form) => {
  const experimentId = form.get('experimentId');

  return (dispatch) => {
    dispatch(showLoader());

    return uploadDatasetService(form)
      .then((responseDataset) => {
        const {
          dataset: { uuid: datasetId, originalName: csvName },
          header: { uuid: headerId, originalName: txtName },
        } = responseDataset.data.payload;

        const newParameters = {
          ...experimentTemplateParameters,
          conjunto_dados: { target: undefined, datasetId, txtName, csvName },
        };

        const newExperimentDetails = {
          datasetId,
          headerId,
          targetColumnId: null,
          runId: null,
        };

        projectsServices
          .updateExperiment(projectId, experimentId, {
            ...newExperimentDetails,
            parameters: JSON.stringify(newParameters),
          })
          .then(() => {
            getHeaderColumns(headerId).then((responseColumns) => {
              const { payload: columns } = responseColumns.data;

              dispatch(
                uploadDatasetSuccess({
                  ...newExperimentDetails,
                  parameters: newParameters,
                  columns,
                })
              );
            });
          });
      })
      .finally(() => dispatch(hideLoader()));
  };
};
