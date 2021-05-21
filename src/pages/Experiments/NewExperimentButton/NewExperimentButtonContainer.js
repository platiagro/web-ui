import React from 'react';
import { useDispatch } from 'react-redux';

import { showNewExperimentModal } from 'store/ui/actions';

import NewExperimentButton from './index';

const NewExperimentButtonContainer = () => {
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showNewExperimentModal());
  };

  return <NewExperimentButton disabled={false} handleClick={handleShowModal} />;
};

export default NewExperimentButtonContainer;
