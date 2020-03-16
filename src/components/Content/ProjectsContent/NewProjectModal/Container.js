// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { createProject } from '../../../../store/projects/actions';

// COMPONENTS
import NewProjectModal from './index';

// MOCKS
// project mock
const projectMock = {
  createdAt: 'October 13, 2014 11:13:00',
};

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateProject: (projectName) =>
      dispatch(
        createProject({
          ...projectMock,
          name: projectName,
          uuid: projectName.toLowerCase(),
        })
      ),
  };
};

/**
 * New Project Modal Container.
 * This component is responsible for create a logic container for new project
 * modal with redux.
 */
const NewProjectModalContainer = ({
  visible,
  handleCloseModal,
  handleCreateProject,
}) => (
  <NewProjectModal
    visible={visible}
    handleCloseModal={handleCloseModal}
    handleNewProject={handleCreateProject}
  />
);

// EXPORT
export default connect(null, mapDispatchToProps)(NewProjectModalContainer);
