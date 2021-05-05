import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useIsLoading } from 'hooks';
import { hideNewProjectModal } from 'store/ui/actions';
import { Actions as projectsActions, PROJECTS_TYPES } from 'store/projects';

import NewProjectModal from './index';

const { updateProjectRequest, createProjectRequest } = projectsActions;

/**
 * New Project Modal Container.
 *
 * This component is responsible for create a logic container for new project
 * modal with redux.
 */
const NewProjectModalContainer = () => {
  const history = useHistory();

  const loading = useIsLoading(
    PROJECTS_TYPES.UPDATE_PROJECT_REQUEST,
    PROJECTS_TYPES.CREATE_PROJECT_REQUEST
  );

  // TODO: Criar seletores
  /* eslint-disable */
  const modalVisible = useSelector(
    (state) => state.uiReducer.newProjectModal.visible
  );
  const title = useSelector((state) => state.uiReducer.newProjectModal.title);
  const record = useSelector((state) => state.uiReducer.newProjectModal.record);
  const modalValidateStatus = useSelector(
    (state) => state.uiReducer.newProjectModal.modalValidateStatus
  );
  const errorMessage = useSelector(
    (state) => state.uiReducer.newProjectModal.errorMessage
  );
  /* eslint-enable */

  const dispatch = useDispatch();

  const handleCloseModal = () => dispatch(hideNewProjectModal());

  const handleCreateProject = (projectName, projectDescription) =>
    dispatch(
      createProjectRequest(
        { name: projectName, description: projectDescription },
        history
      )
    );

  const handleUpdateProject = (projectId, projectName, projectDescription) =>
    dispatch(
      updateProjectRequest(projectId, {
        name: projectName,
        description: projectDescription,
      })
    );

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

export default NewProjectModalContainer;
