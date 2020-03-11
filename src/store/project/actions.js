// project mock
const projectMock = {
  uuid: '1234567899',
  name: 'Projeto Mocked',
  createdAt: 'October 13, 2014 11:13:00',
};

/**
 * create new project action
 * @returns {type, project}
 */
const createProject = () => ({
  type: actionTypes.CREATE_PROJECT,
  project: projectMock,
});
