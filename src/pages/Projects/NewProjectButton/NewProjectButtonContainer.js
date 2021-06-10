import React from 'react';
import { useDispatch } from 'react-redux';

import { useIsLoading } from 'hooks';
import { PROJECTS_TYPES } from 'store/projects';
import { showNewProjectModal } from 'store/ui/actions';

import NewProjectButton from './index';

const NewProjectButtonContainer = () => {
  const dispatch = useDispatch();

  const loading = useIsLoading(PROJECTS_TYPES.FETCH_PROJECTS_REQUEST);

  const handleShowNewProjectModal = () => {
    dispatch(showNewProjectModal());
  };

  return (
    <NewProjectButton
      disabled={loading}
      handleClick={handleShowNewProjectModal}
    />
  );
};

export default NewProjectButtonContainer;
