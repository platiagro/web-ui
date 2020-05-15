// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ACTIONS
import {
  createProjectRequest,
  editProjectNameRequest,
} from '../../../../store/project/actions';
import { hideNewProjectModal } from '../../../../store/ui/actions';

// COMPONENTS
import NewProjectModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    // create project action
    handleCreateProject: (projectName, projectDescription) =>
      dispatch(
        createProjectRequest(projectName, projectDescription, routerProps)
      ),
    // close modal action
    handleCloseModal: () => dispatch(hideNewProjectModal()),
    handleUpdateProject: (projectId, projectName, projectDescription) =>
      dispatch(
        editProjectNameRequest(projectId, projectName, projectDescription)
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  // new project modal visible
  return {
    modalVisible: state.ui.newProjectModal.visible,
    loading: state.ui.projectsTable.loading,
    title: state.ui.newProjectModal.title,
    record: state.ui.newProjectModal.record,
  };
};

/**
 * New Project Modal Container.
 * This component is responsible for create a logic container for new project
 * modal with redux.
 */
const NewProjectModalContainer = ({
  modalVisible,
  loading,
  handleCloseModal,
  handleCreateProject,
  title,
  record,
  handleUpdateProject,
}) => (
  <NewProjectModal
    visible={modalVisible}
    handleCloseModal={handleCloseModal}
    handleNewProject={handleCreateProject}
    handleUpdateProject={handleUpdateProject}
    loading={loading}
    title={title}
    record={record}
  />
);

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewProjectModalContainer)
);
