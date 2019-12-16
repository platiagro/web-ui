import * as projectServices from '../../services/projectsApi';

export const EXPERIMENTS_SET_ACTIVE_KEY = 'EXPERIMENTS_SET_ACTIVE_KEY';
export const EXPERIMENTS_ADD_EXPERIMENT = 'EXPERIMENTS_ADD_EXPERIMENT';

export const setActiveKey = (key) => {
  return {
    type: EXPERIMENTS_SET_ACTIVE_KEY,
    activeKey: key,
  };
};

const addExperimentDispatch = (uuid) => {
  return {
    type: EXPERIMENTS_ADD_EXPERIMENT,
    uuid,
  };
};

export const addExperiment = (projectId, name) => {
  return (dispatch) => {
    return projectServices
      .createExperiment(projectId, name)
      .then((response) => {
        dispatch(addExperimentDispatch(response.data.payload.uuid));
        return response;
      })
      .catch((error) => {
        throw error;
      });
  };
};
