// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import { actionTypes } from 'store/Projects/Actions';

// SERVICES
import projectsApi from '../../services/ProjectsApi';

// UI ACTIONS
import { hideNewProjectModal } from '../ui/actions';

// ** CREATE PROJECT
/**
 * create project success action
 *
 * @param {object} response
 * @param {object} routerProps
 * @returns {object} { type, project }
 */
const createProjectSuccess = (response, routerProps) => (dispatch) => {
  // getting project from response
  const project = response.data;

  // dispatching hide modal
  dispatch(hideNewProjectModal());

  // dispatching create project success
  dispatch({
    type: actionTypes.CREATE_PROJECT_SUCCESS,
    project,
    payload: {
      isLoading: false,
    },
  });

  message.success(`Projeto ${project.name} criado!`);

  // go to new project
  routerProps.history.push(`/projetos/${project.uuid}`);
};

/**
 * create project fail action
 *
 * @param {object} error
 * @returns {object} { type, errorMessage }
 */
const createProjectFail = (error) => (dispatch) => {
  // getting error message
  let errorMessage;
  if (error.response.status === 500) {
    errorMessage = error.message;
    message.error(errorMessage, 5);
  } else {
    errorMessage = error.response.data.message;
    if (errorMessage.includes('name already exist')) {
      errorMessage = 'Já existe um projeto com este nome!';

      // dispatching edit project name fail
      dispatch({
        type: actionTypes.CREATE_PROJECT_FAIL,
        errorMessage,
        payload: {
          isLoading: false,
        },
      });
    } else {
      message.error(errorMessage, 5);
    }
  }
};

/**
 * create project request action
 *
 * @param projectName
 * @param projectDescription
 * @param routerProps
 * @param projectName
 * @param projectDescription
 * @param routerProps
 * @param projectName
 * @param projectDescription
 * @param routerProps
 * @returns {Function}
 */
export const createProjectRequest = (
  projectName,
  projectDescription,
  routerProps
) => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.CREATE_PROJECT_REQUEST,
    payload: {
      isLoading: true,
    },
  });

  // creating project
  projectsApi
    .createProject(projectName, projectDescription)
    .then((response) => dispatch(createProjectSuccess(response, routerProps)))
    .catch((error) => dispatch(createProjectFail(error)));
};
