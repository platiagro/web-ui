/**
 * Actions for project page
 */
import { message } from 'antd';
import * as pipelinesServices from '../../services/pipelinesApi';
import * as projectsServices from '../../services/projectsApi';

export const PROJECT_FETCH_DETAIL_STARTED = 'PROJECT_FETCH_DETAIL_STARTED';
export const PROJECT_FETCH_DETAIL = 'PROJECT_FETCH_DETAIL';
export const PROJECT_UPDATE_NAME = 'PROJECT_UPDATE_NAME';
export const PROJECT_GET_PIPELINES = 'PROJECT_GET_PIPELINES';
export const PROJECT_UPDATE_EXPERIMENT = 'PROJECT_UPDATE_EXPERIMENT';

export const PROJECT_SET_COLUMNS = 'PROJECT_SET_COLUMNS';
export const PROJECT_SET_RUN_STATUS = 'PROJECT_SET_RUN_STATUS';
export const PROJECT_SET_PARAMETERS = 'PROJECT_SET_PARAMETERS';
export const PROJECT_SET_SELECTED_DRAWER = 'PROJECT_SET_SELECTED_DRAWER';
export const PROJECT_SET_TASK_STATUS = 'PROJECT_SET_TASK_STATUS';

export const PROJECT_SET_GROUP = 'PROJECT_SET_GROUP';
export const PROJECT_SET_PERIOD = 'PROJECT_SET_PERIOD';
export const PROJECT_SET_CUT_OFF_PRE_1 = 'PROJECT_SET_CUT_OFF_PRE_1';
export const PROJECT_SET_CORRELATION_PRE_1 = 'PROJECT_SET_CORRELATION_PRE_1';
export const PROJECT_SET_CUT_OFF_PRE_2 = 'PROJECT_SET_CUT_OFF_PRE_2';
export const PROJECT_SET_CORRELATION_PRE_2 = 'PROJECT_SET_CORRELATION_PRE_2';
export const PROJECT_SET_FILTER = 'PROJECT_SET_FILTER';
export const PROJECT_SET_AUTOML = 'PROJECT_SET_AUTOML';
export const PROJECT_SET_CSV = 'PROJECT_SET_CSV';
export const PROJECT_SET_TXT = 'PROJECT_SET_TXT';
export const PROJECT_SET_TARGET = 'PROJECT_SET_TARGET';
export const PROJECT_SET_TEMPLATE = 'PROJECT_SET_TEMPLATE';
export const PROJECT_SET_DATASET = 'PROJECT_SET_DATASET';

/**
 * Function to dispatch action PROJECT_FETCH_DETAIL_STARTED
 */
export const fetchStarted = () => {
  return {
    type: PROJECT_FETCH_DETAIL_STARTED,
  };
};

/**
 * Function to dispatch action PROJECT_FETCH_DETAIL
 * @param {Object} detail
 */
export const setProjectDetail = (detail) => {
  return {
    type: PROJECT_FETCH_DETAIL,
    detail,
  };
};

/**
 * Function to fetch project detail and dispatch to reducer
 * @param {String} id
 */
export const getProjectDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return projectsServices.getProject(id).then(async (projectResponse) => {
      if (!projectResponse) {
        dispatch(setProjectDetail({}));
      } else {
        await projectsServices
          .getExperimentList(id)
          .then((experimentResponse) => {
            if (!experimentResponse) {
              dispatch(setProjectDetail({}));
            } else {
              const auxDetails = { name: null, uuid: null, experimentList: [] };
              auxDetails.name = projectResponse.data.payload.name;
              auxDetails.uuid = projectResponse.data.payload.uuid;
              auxDetails.experimentList = experimentResponse.data.payload;
              dispatch(setProjectDetail(auxDetails));
            }
          });
      }
    });
  };
};

/**
 * Function to dispatch action PROJECT_UPDATE_NAME
 * @param {String} name
 */
export const setProjectName = (name) => {
  return {
    type: PROJECT_UPDATE_NAME,
    name,
  };
};

/**
 * Function to update project name and dispatch to reducer
 * @param {Object} editableDetails
 * @param {String} name
 */
export const updateProjectName = (editableDetails, name) => {
  const { uuid } = editableDetails;
  return (dispatch) => {
    return projectsServices.updateProject(uuid, name).then((response) => {
      if (response) {
        dispatch(setProjectName(name));
        return true;
      }
      return false;
    });
  };
};

/**
 * Function to dispatch action PROJECT_GET_PIPELINES
 * @param {Object} flowDetail
 */
export const setFlowDetails = (flowDetail) => {
  return {
    type: PROJECT_GET_PIPELINES,
    flowDetail,
  };
};

/**
 * Function to fetch pipelines and dispatch to reducer
 * @param {Object[]} templateItems
 */
export const getPipelines = (templateItems) => {
  return (dispatch) => {
    return pipelinesServices.getPipelines().then((pipelines) => {
      if (!pipelines) message.error('Cross-Origin Request Blocked');
      const items = { ...templateItems };
      items.template = items.template.map((template) => {
        const templateAux = template;
        if (pipelines) {
          templateAux.pipelineTrainId =
            pipelines[template.databaseName].trainId;
          templateAux.pipelineDeployId =
            pipelines[template.databaseName].deployId;
          if (templateAux.template === 4) templateAux.disabled = false;
        } else {
          templateAux.disabled = true;
        }

        if (template.default) {
          dispatch(setFlowDetails(template));
        }
        return templateAux;
      });
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
export const updateExperiment = (projectId, experimentId, body, template) => {
  return (dispatch) => {
    return projectsServices
      .updateExperiment(projectId, experimentId, body)
      .then((response) => {
        if (response) {
          dispatch(setFlowDetails(template));
        }
      });
  };
};

export const setColumns = (columns) => {
  return {
    type: PROJECT_SET_COLUMNS,
    columns,
  };
};

export const setRunStatus = (status) => {
  return {
    type: PROJECT_SET_RUN_STATUS,
    status,
  };
};

export const setParameters = (parameters) => {
  return {
    type: PROJECT_SET_PARAMETERS,
    parameters,
  };
};

export const setSelectedDrawer = (selected) => {
  return {
    type: PROJECT_SET_SELECTED_DRAWER,
    selected,
  };
};

export const setTaskStatus = (status) => {
  return {
    type: PROJECT_SET_GROUP,
    status,
  };
};

export const setGroup = (group) => {
  return {
    type: PROJECT_SET_GROUP,
    group,
  };
};

export const setPeriod = (period) => {
  return {
    type: PROJECT_SET_PERIOD,
    period,
  };
};

export const setCutoffPre1 = (cutOffPre1) => {
  return {
    type: PROJECT_SET_CUT_OFF_PRE_1,
    cutOffPre1,
  };
};

export const setCorrelationPre1 = (correlationPre1) => {
  return {
    type: PROJECT_SET_CORRELATION_PRE_1,
    correlationPre1,
  };
};

export const setCutoffPre2 = (cutOffPre2) => {
  return {
    type: PROJECT_SET_CUT_OFF_PRE_2,
    cutOffPre2,
  };
};

export const setCorrelationPre2 = (correlationPre2) => {
  return {
    type: PROJECT_SET_CORRELATION_PRE_2,
    correlationPre2,
  };
};

export const setFilter = (filter) => {
  return {
    type: PROJECT_SET_FILTER,
    filter,
  };
};

export const setAutoML = (automl) => {
  return {
    type: PROJECT_SET_AUTOML,
    automl,
  };
};

export const setCsv = (csv) => {
  return {
    type: PROJECT_SET_CSV,
    csv,
  };
};

export const setTxt = (txt) => {
  return {
    type: PROJECT_SET_TXT,
    txt,
  };
};

export const setTarget = (target) => {
  return {
    type: PROJECT_SET_TARGET,
    target,
  };
};

export const setTemplate = (template) => {
  return {
    type: PROJECT_SET_TEMPLATE,
    template,
  };
};

export const setDataset = (dataset) => {
  return {
    type: PROJECT_SET_DATASET,
    dataset,
  };
};
