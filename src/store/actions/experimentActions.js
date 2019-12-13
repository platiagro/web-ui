/**
 * Actions for experiment details
 */
import * as projectsServices from '../../services/projectsApi';

export const EXPERIMENT_FETCH_STARTED = 'EXPERIMENT_FETCH_STARTED';
export const EXPERIMENT_FETCH = 'EXPERIMENT_FETCH';
export const EXPERIMENT_UPDATE = 'EXPERIMENT_UPDATE';
export const EXPERIMENT_UPDATE_NAME = 'EXPERIMENT_UPDATE_NAME';

export const EXPERIMENT_SET_COLUMNS = 'EXPERIMENT_SET_COLUMNS';
export const EXPERIMENT_SET_RUN_STATUS = 'EXPERIMENT_SET_RUN_STATUS';
export const EXPERIMENT_SET_PARAMETERS = 'EXPERIMENT_SET_PARAMETERS';
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
export const EXPERIMENT_SET_CSV = 'EXPERIMENT_SET_CSV';
export const EXPERIMENT_SET_TXT = 'EXPERIMENT_SET_TXT';
export const EXPERIMENT_SET_TARGET = 'EXPERIMENT_SET_TARGET';
export const EXPERIMENT_SET_TEMPLATE = 'EXPERIMENT_SET_TEMPLATE';
export const EXPERIMENT_SET_DATASET = 'EXPERIMENT_SET_DATASET';

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
const setExperimentDetails = (experiment) => {
  return {
    type: EXPERIMENT_FETCH,
    experiment,
  };
};

export const getExperiment = (projectId, experimentId) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return projectsServices
      .getExperiment(projectId, experimentId)
      .then(async (experiment) => {
        if (experiment) dispatch(setExperimentDetails(experiment.data.payload));
        else dispatch(setExperimentDetails({}));
      });
  };
};

/**
 * Function to update project experiment and dispatch to reducer
 * @param {String} projectId
 * @param {String} experimentId
 * @param {Object} body
 * @param {Object} template
 */
export const updateExperiment = (projectId, experimentId, body) => {
  return (dispatch) => {
    return projectsServices
      .updateExperiment(projectId, experimentId, body)
      .then((response) => {
        if (response) dispatch(getExperiment(projectId, experimentId));
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
          return true;
        }
        return false;
      });
  };
};

export const setColumns = (columns) => {
  return {
    type: EXPERIMENT_SET_COLUMNS,
    columns,
  };
};

export const setRunStatus = (status) => {
  return {
    type: EXPERIMENT_SET_RUN_STATUS,
    status,
  };
};

export const setParameters = (parameters) => {
  return {
    type: EXPERIMENT_SET_PARAMETERS,
    parameters,
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

export const setCsv = (csv) => {
  return {
    type: EXPERIMENT_SET_CSV,
    csv,
  };
};

export const setTxt = (txt) => {
  return {
    type: EXPERIMENT_SET_TXT,
    txt,
  };
};

export const setTarget = (target) => {
  return {
    type: EXPERIMENT_SET_TARGET,
    target,
  };
};

export const setTemplate = (template) => {
  return {
    type: EXPERIMENT_SET_TEMPLATE,
    template,
  };
};

export const setDataset = (dataset) => {
  return {
    type: EXPERIMENT_SET_DATASET,
    dataset,
  };
};
