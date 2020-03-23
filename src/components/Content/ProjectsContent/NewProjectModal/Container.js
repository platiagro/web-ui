// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ACTIONS
import { createProjectRequest } from '../../../../store/project/actions';
import { hideNewProjectModal } from '../../../../store/ui/actions';

// COMPONENTS
import NewProjectModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    // create project action
    handleCreateProject: (projectName) =>
      dispatch(createProjectRequest(projectName, routerProps)),
    // close modal action
    handleCloseModal: () => dispatch(hideNewProjectModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  // new project modal visible
  return { modalVisible: state.ui.newProjectModal.visible };
};

/**
 * New Project Modal Container.
 * This component is responsible for create a logic container for new project
 * modal with redux.
 */
const NewProjectModalContainer = ({
  modalVisible,
  handleCloseModal,
  handleCreateProject,
}) => (
  <NewProjectModal
    visible={modalVisible}
    handleCloseModal={handleCloseModal}
    handleNewProject={handleCreateProject}
  />
);

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewProjectModalContainer)
);
