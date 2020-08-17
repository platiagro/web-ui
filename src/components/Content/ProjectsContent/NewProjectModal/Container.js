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
    handleUpdateProject: (
      projectId,
      projectName,
      projectDescription,
      isModal
    ) =>
      dispatch(
        editProjectNameRequest(
          projectId,
          projectName,
          projectDescription,
          isModal
        )
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  // new project modal visible
  return {
    modalVisible: state.uiReducer.newProjectModal.visible,
    loading: state.uiReducer.projectEditName.loading,
    title: state.uiReducer.newProjectModal.title,
    record: state.uiReducer.newProjectModal.record,
    modalValidateStatus: state.uiReducer.newProjectModal.modalValidateStatus,
    errorMessage: state.uiReducer.newProjectModal.errorMessage,
  };
};

/**
 * New Project Modal Container.
 * This component is responsible for create a logic container for new project
 * modal with redux.
 *
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.modalVisible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleCreateProject
 * @param root0.handleUpdateProject
 */
const NewProjectModalContainer = ({
  modalVisible,
  loading,
  title,
  record,
  modalValidateStatus,
  errorMessage,
  handleCloseModal,
  handleCreateProject,
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
    modalValidateStatus={modalValidateStatus}
    errorMessage={errorMessage}
  />
);

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewProjectModalContainer)
);
