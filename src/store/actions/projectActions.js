/**
 * Actions for project page
 */
import { message } from 'antd';
import * as pipelinesServices from '../../services/pipelinesApi';
import * as projectsServices from '../../services/projectsApi';

import { setExperimentDetails } from './experimentActions';

export const PROJECT_RESET = 'PROJECT_RESET';
export const PROJECT_FETCH_DETAIL_STARTED = 'PROJECT_FETCH_DETAIL_STARTED';
export const PROJECT_FETCH_DETAIL = 'PROJECT_FETCH_DETAIL';
export const PROJECT_UPDATE_NAME = 'PROJECT_UPDATE_NAME';
export const PROJECT_GET_PIPELINES = 'PROJECT_GET_PIPELINES';
export const PROJECT_UPDATE_EXPERIMENT = 'PROJECT_UPDATE_EXPERIMENT';
export const PROJECT_SET_ACTIVE_KEY = 'PROJECT_SET_ACTIVE_KEY';
export const PROJECT_ADD_EXPERIMENT = 'PROJECT_ADD_EXPERIMENT';

/**
 * Function to dispatch action PROJECT_RESET
 */
export const resetProject = () => {
  return {
    type: PROJECT_RESET,
  };
};

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
 * @param {Object} project
 */
export const setProjectDetail = (project) => {
  return {
    type: PROJECT_FETCH_DETAIL,
    project,
  };
};

/**
 * Function to fetch project detail and dispatch to reducer
 * @param {String} id
 */
export const getProject = (id) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return projectsServices.getProject(id).then(async (project) => {
      if (project) dispatch(setProjectDetail(project.data.payload));
      else dispatch(setProjectDetail({}));
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

export const setActiveKey = (key) => {
  return {
    type: PROJECT_SET_ACTIVE_KEY,
    activeKey: key,
  };
};

const addExperimentDispatch = (newExperiment) => {
  return {
    type: PROJECT_ADD_EXPERIMENT,
    newExperiment,
  };
};

export const addExperiment = (projectId, name) => {
  return (dispatch) => {
    return projectsServices
      .createExperiment(projectId, name)
      .then((response) => {
        if (response) {
          dispatch(addExperimentDispatch(response.data.payload));
          if (response) dispatch(setExperimentDetails(response.data.payload));
          else dispatch(setExperimentDetails({}));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

// /**
//  * Function to update project experiment and dispatch to reducer
//  * @param {String} projectId
//  * @param {String} experimentId
//  * @param {Object} body
//  * @param {Object} template
//  */
// export const updateExperiment = (projectId, experimentId, body, template) => {
//   return (dispatch) => {
//     return projectsServices
//       .updateExperiment(projectId, experimentId, body)
//       .then((response) => {
//         if (response) {
//           dispatch(setFlowDetails(template));
//         }
//       });
//   };
// };
