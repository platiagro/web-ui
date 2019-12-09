import * as projectsServices from '../../services/projectsApi';

export const PROJECTS_ADD = 'PROJECTS_ADD';
export const PROJECTS_FETCH = 'PROJECTS_FETCH';
export const PROJECTS_FETCH_STARTED = 'PROJECTS_FETCH_STARTED';
export const PROJECTS_TOGGLE_MODAL = 'PROJECTS_TOGGLE_MODAL';

const dispatchAdd = () => {
  return {
    type: PROJECTS_ADD,
  };
};

export const addProject = (name, history) => {
  return (dispatch) => {
    return projectsServices
      .createProject(name)
      .then((response) => {
        dispatch(dispatchAdd());
        if (response) {
          history.push(`/projects/${response.data.payload.uuid}`);
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

const fetchStarted = () => {
  return {
    type: PROJECTS_FETCH_STARTED,
  };
};

const dispatchFetchProjects = (projects) => {
  return {
    type: PROJECTS_FETCH,
    projects,
  };
};

export const fetchProjects = () => {
  return (dispatch) => {
    dispatchEvent(fetchStarted());
    return projectsServices
      .getAllProjects()
      .then((response) => {
        dispatch(dispatchFetchProjects(response.data.payload));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const toggleModal = () => {
  return {
    type: PROJECTS_TOGGLE_MODAL,
  };
};
