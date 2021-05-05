import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useIsLoading } from 'hooks';
import { hideNewProjectModal } from 'store/ui/actions';
import { Actions as projectsActions, PROJECTS_TYPES } from 'store/projects';

import NewProjectModal from './index';

const { updateProjectRequest, createProjectRequest } = projectsActions;

const titleSelector = ({ uiReducer }) => {
  return uiReducer.newProjectModal.title;
};

const recordSelector = ({ uiReducer }) => {
  return uiReducer.newProjectModal.record;
};

const modalVisibleSelector = ({ uiReducer }) => {
  return uiReducer.newProjectModal.visible;
};

const errorMessageSelector = ({ uiReducer }) => {
  return uiReducer.newProjectModal.errorMessage;
};

const modalValidateStatusSelector = ({ uiReducer }) => {
  return uiReducer.newProjectModal.modalValidateStatus;
};

const NewProjectModalContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useIsLoading(
    PROJECTS_TYPES.UPDATE_PROJECT_REQUEST,
    PROJECTS_TYPES.CREATE_PROJECT_REQUEST
  );

  const title = useSelector(titleSelector);
  const record = useSelector(recordSelector);
  const modalVisible = useSelector(modalVisibleSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const modalValidateStatus = useSelector(modalValidateStatusSelector);

  const handleCloseModal = () => {
    dispatch(hideNewProjectModal());
  };

  const handleCreateProject = (projectName, projectDescription) => {
    dispatch(
      createProjectRequest(
        { name: projectName, description: projectDescription },
        history
      )
    );
  };

  const handleUpdateProject = (projectId, projectName, projectDescription) => {
    dispatch(
      updateProjectRequest(projectId, {
        name: projectName,
        description: projectDescription,
      })
    );
  };

  return (
    <NewProjectModal
      title={title}
      record={record}
      loading={loading}
      visible={modalVisible}
      errorMessage={errorMessage}
      modalValidateStatus={modalValidateStatus}
      handleCloseModal={handleCloseModal}
      handleNewProject={handleCreateProject}
      handleUpdateProject={handleUpdateProject}
    />
  );
};

export default NewProjectModalContainer;
