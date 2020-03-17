// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ACTIONS
import { createProjectRequest } from '../../../../store/project/actions';

// COMPONENTS
import NewProjectModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleCreateProject: (projectName) =>
      dispatch(createProjectRequest(projectName, routerProps)),
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
export default withRouter(
  connect(null, mapDispatchToProps)(NewProjectModalContainer)
);
