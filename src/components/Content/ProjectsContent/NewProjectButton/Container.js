import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NewProjectButton from './index';

import { showNewProjectModal } from '../../../../store/ui/actions';
import { Selectors as projectsSelectors } from 'store/projects';

const { getIsLoading } = projectsSelectors;

/**
 * New Project Button Container.
 *
 * This component is responsible for create a logic container for new project
 * button with redux.
 */
const NewProjectButtonContainer = () => {
  const dispatch = useDispatch();

  const loading = useSelector(getIsLoading);

  const handleShowNewProjectModal = () => dispatch(showNewProjectModal());

  return (
    <NewProjectButton
      disabled={loading}
      handleClick={handleShowNewProjectModal}
    />
  );
};

export default NewProjectButtonContainer;
