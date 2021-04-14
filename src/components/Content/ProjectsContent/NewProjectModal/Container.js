// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ACTIONS
import { hideNewProjectModal } from '../../../../store/ui/actions';

import { Actions as projectsActions, Selectors } from 'store/Projects';

// COMPONENTS
import NewProjectModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch, ownProps) => {
  const { updateProjectRequest, createProjectRequest } = projectsActions;

  return {
    // create project action
    handleCreateProject: (projectName, projectDescription) =>
      dispatch(
        createProjectRequest(
          { name: projectName, description: projectDescription },
          ownProps
        )
      ),
    // close modal action
    handleCloseModal: () => dispatch(hideNewProjectModal()),
    handleUpdateProject: (projectId, projectName, projectDescription) =>
      dispatch(
        updateProjectRequest(projectId, {
          name: projectName,
          description: projectDescription,
        })
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  const { getIsLoading } = Selectors;

  // new project modal visible
  return {
    modalVisible: state.uiReducer.newProjectModal.visible,
    loading: getIsLoading(state),
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
