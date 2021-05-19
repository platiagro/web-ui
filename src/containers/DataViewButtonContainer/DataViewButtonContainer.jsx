import React from 'react';
import { useDispatch } from 'react-redux';

import { DataViewButton } from 'components/Buttons';
import { showDataViewModal } from 'store/ui/actions';

const DataViewButtonContainer = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showDataViewModal());
  };

  return (
    <DataViewButton
      isLoading={false}
      isDisabled={false}
      handleClick={handleClick}
    />
  );
};

export default DataViewButtonContainer;
