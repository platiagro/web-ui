import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  EXPERIMENTS_TYPES,
  Actions as experimentsActions,
} from 'store/projects/experiments';
import { useIsLoading } from 'hooks';
import { hideNewExperimentModal } from 'store/ui/actions';

import NewExperimentModal from './index';

const modalVisibleSelector = ({ uiReducer }) => {
  return uiReducer.newExperimentModal.visible;
};

const errorMessageSelector = ({ uiReducer }) => {
  return uiReducer.newExperimentModal.errorMessage;
};

const modalValidateStatusSelector = ({ uiReducer }) => {
  return uiReducer.newExperimentModal.modalValidateStatus;
};

const NewExperimentModalContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useIsLoading(EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST);

  const modalVisible = useSelector(modalVisibleSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const modalValidateStatus = useSelector(modalValidateStatusSelector);

  const handleHideExperimentModal = () => {
    dispatch(hideNewExperimentModal());
  };

  const newExperimentHandler = (experimentName, copyFrom) => {
    dispatch(
      experimentsActions.createExperimentRequest(
        projectId,
        { name: experimentName, copyFrom },
        history
      )
    );
  };

  return (
    <NewExperimentModal
      loading={loading}
      visible={modalVisible}
      errorMessage={errorMessage}
      modalValidateStatus={modalValidateStatus}
      handleNewExperiment={newExperimentHandler}
      handleCloseModal={handleHideExperimentModal}
    />
  );
};

export default NewExperimentModalContainer;
