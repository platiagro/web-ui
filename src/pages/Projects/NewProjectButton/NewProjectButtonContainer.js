import React from 'react';
import { useDispatch } from 'react-redux';

import NewProjectButton from './index';

import { showNewProjectModal } from 'store/ui/actions';
import { PROJECTS_TYPES } from 'store/projects';

import { useIsLoading } from 'hooks';

/**
 * New Project Button Container.
 *
 * This component is responsible for create a logic container for new project
 * button with redux.
 */
const NewProjectButtonContainer = () => {
  const dispatch = useDispatch();

  const loading = useIsLoading(PROJECTS_TYPES.FETCH_PROJECTS_REQUEST);

  const handleShowNewProjectModal = () => dispatch(showNewProjectModal());

  return (
    <NewProjectButton
      disabled={loading}
      handleClick={handleShowNewProjectModal}
    />
  );
};

export default NewProjectButtonContainer;
