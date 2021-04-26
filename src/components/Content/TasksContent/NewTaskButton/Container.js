import React from 'react';
import { useDispatch } from 'react-redux';

import { showNewTaskModal } from 'store/tasks';

import NewTaskButton from './index';

const NewProjectButtonContainer = () => {
  const dispatch = useDispatch();

  const handleShowNewTaskModal = () => {
    dispatch(showNewTaskModal());
  };

  return (
    <NewTaskButton disabled={false} handleClick={handleShowNewTaskModal} />
  );
};

export default NewProjectButtonContainer;
