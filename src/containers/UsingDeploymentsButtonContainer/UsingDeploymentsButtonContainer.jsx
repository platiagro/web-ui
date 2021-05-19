import React from 'react';
import { useDispatch } from 'react-redux';

import { UsingDeploymentsButton } from 'components/Buttons';
import { showUsingDeploymentsModal } from 'store/ui/actions';

const UsingDeploymentsButtonContainer = () => {
  const dispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showUsingDeploymentsModal());
  };

  return <UsingDeploymentsButton onClick={handleShowModal} />;
};

export default UsingDeploymentsButtonContainer;
