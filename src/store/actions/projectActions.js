import { message } from 'antd';
import * as pipelinesServices from '../../services/pipelinesApi';
import * as projectsServices from '../../services/projectsApi';

export const PROJECT_FETCH_DETAIL_STARTED = 'PROJECT_FETCH_DETAIL_STARTED';
export const PROJECT_FETCH_DETAIL = 'PROJECT_FETCH_DETAIL';
export const PROJECT_UPDATE_NAME = 'PROJECT_UPDATE_NAME';
export const PROJECT_GET_PIPELINES = 'PROJECT_GET_PIPELINES';
export const PROJECT_UPDATE_EXPERIMENT = 'PROJECT_UPDATE_EXPERIMENT';

const fetchStarted = () => {
  return {
    type: PROJECT_FETCH_DETAIL_STARTED,
  };
};

const setProjectDetail = (detail) => {
  return {
    type: PROJECT_FETCH_DETAIL,
    detail,
  };
};

export const getProjectDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return projectsServices
      .getProject(id)
      .then((projectResponse) => {
        if (!projectResponse) {
          dispatch(setProjectDetail({}));
        } else {
          projectsServices.getExperimentList(id).then((experimentResponse) => {
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
      })
      .catch((error) => {
        throw error;
      });
  };
};

const setProjectName = (name) => {
  return {
    type: PROJECT_UPDATE_NAME,
    name,
  };
};

export const updateProjectName = (editableDetails, name, resultCallback) => {
  const { uuid } = editableDetails;
  return (dispatch) => {
    return projectsServices
      .updateProject(uuid, name)
      .then((response) => {
        if (response) {
          dispatch(setProjectName(name));
        } else if (resultCallback) {
          resultCallback(false);
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

const setFlowDetails = (flowDetail) => {
  return {
    type: PROJECT_GET_PIPELINES,
    flowDetail,
  };
};

export const getPipelines = (templateItems) => {
  return (dispatch) => {
    return pipelinesServices
      .getPipelines()
      .then((pipelines) => {
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
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const updateExperiment = (projectId, experimentId, body, template) => {
  return (dispatch) => {
    return projectsServices
      .updateExperiment(projectId, experimentId, body)
      .then((response) => {
        if (response) {
          dispatch(setFlowDetails(template));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};
