/**
 * projects actions
 */

// IMPORTING ACTION TYPES
import actionTypes from './actionTypes';

// importing mocks
import projectsMock from '../../components/Content/ProjectsContent/_/_projectsMock';

// project mock
const projectMock = {
  uuid: '1234567899',
  name: 'Projeto Mocked',
  createdAt: 'October 13, 2014 11:13:00',
};

/**
 * fetch projects action
 * @returns {type, projects}
 */
const fetchProjects = () => ({
  type: actionTypes.FETCH_PROJECTS,
  projects: projectsMock,
});

/**
 * create new project action
 * @returns {type, project}
 */
const createProject = () => ({
  type: actionTypes.CREATE_PROJECT,
  project: projectMock,
});
