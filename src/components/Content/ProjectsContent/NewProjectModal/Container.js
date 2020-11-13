// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ACTIONS
import {
  fetchCreateProjectRequest,
  updateProjectNameRequest,
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
        fetchCreateProjectRequest(projectName, projectDescription, routerProps)
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
        updateProjectNameRequest(
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
 * @component
 * @param {object} props Component props
 * @returns {NewProjectModalContainer} React component
 */
const NewProjectModalContainer = (props) => {
  // destructuring props
  const {
    modalVisible,
    loading,
    title,
    record,
    modalValidateStatus,
    errorMessage,
    handleCloseModal,
    handleCreateProject,
    handleUpdateProject,
  } = props;

  // rendering component
  return (
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
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewProjectModalContainer)
);
