import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { hideNewProjectModal } from '../../../../store/ui/actions';

import { Actions as projectsActions, Selectors } from 'store/projects';

import NewProjectModal from './index';

const { getIsLoading } = Selectors;
const { updateProjectRequest, createProjectRequest } = projectsActions;

/**
 * New Project Modal Container.
 *
 * This component is responsible for create a logic container for new project
 * modal with redux.
 */
const NewProjectModalContainer = () => {
  const history = useHistory();

  const loading = useSelector(getIsLoading);

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
