// ACTION TYPES
import actionTypes from './actionTypes';
// projects mocks
import projectsMock from '../../components/Content/ProjectsContent/_/_projectsMock';

// MOCKS
// project mock
const projectMock = {
  uuid: '1234567899',
  name: 'Projeto Mocked',
  createdAt: 'October 13, 2014 11:13:00',
};

// ACTIONS
/**
 * fetch project action
 * @returns {type, project}
 */
export const fetchProject = () => ({
  type: actionTypes.FETCH_PROJECT,
  project: projectMock,
});

/**
 * create new project action
 * @returns {type, project}
 */
export const createProject = () => ({
  type: actionTypes.CREATE_PROJECT,
  project: projectMock,
});

/**
 * edit project name action
 * @param {string} newName
 * @returns {type, project}
 */
export const editProjectName = (newName) => ({
  type: actionTypes.EDIT_PROJECT_NAME,
  project: { ...projectMock, name: newName },
});

/**
 * delete project action
 * @param {string} uuid
 * @returns {type, projects}
 */
export const deleteProject = (uuid) => ({
  type: actionTypes.DELETE_PROJECT,
  projects: projectsMock.filter((project) => project.uuid !== uuid),
});
