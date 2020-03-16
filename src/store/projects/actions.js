// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// projects mocks
import projectsMock from '../../components/Content/ProjectsContent/_/_projectsMock';

// ACTIONS
/**
 * fetch projects action
 * @returns {type, projects}
 */
export const fetchProjects = () => ({
  type: actionTypes.FETCH_PROJECTS,
  projects: projectsMock,
});

/**
 * create new project action
 * @param {Object} project
 * @returns {type, projects}
 */
export const createProject = (project) => ({
  type: actionTypes.CREATE_PROJECT,
  projects: [...projectsMock, project],
});

/**
 * delete project action
 * @param {string} projectUuid
 * @returns {type, projects}
 */
export const deleteProject = (projectUuid) => ({
  type: actionTypes.DELETE_PROJECT,
  projects: projectsMock.filter((project) => project.uuid !== projectUuid),
});
