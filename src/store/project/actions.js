// ACTION TYPES
import actionTypes from './actionTypes';

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
 * @param {string} uuid
 * @returns {type, project}
 */
export const fetchProject = (uuid) => ({
  type: actionTypes.FETCH_PROJECT,
  project: projectMock,
});

/**
 * edit project name action
 * @param {string} uuid
 * @param {string} newName
 * @returns {type, project}
 */
export const editProjectName = (uuid, newName) => ({
  type: actionTypes.EDIT_PROJECT_NAME,
  project: { ...projectMock, name: newName },
});
