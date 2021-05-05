import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  Actions as experimentsActions,
  EXPERIMENTS_TYPES,
} from 'store/projects/experiments';
import { hideNewExperimentModal } from 'store/ui/actions';

import { useIsLoading } from 'hooks';

import NewExperimentModal from './index';

/**
 * New Experiment Modal Container.
 *
 * This component is responsible for create a logic container for new experiment
 * modal with redux.
 */
const NewExperimentModalContainer = () => {
  const { projectId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useIsLoading(EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST);

  // TODO: Criar seletores
  /* eslint-disable */
  const modalVisible = useSelector(
    (state) => state.uiReducer.newExperimentModal.visible
  );
  const modalValidateStatus = useSelector(
    (state) => state.uiReducer.newExperimentModal.modalValidateStatus
  );
  const errorMessage = useSelector(
    (state) => state.uiReducer.newExperimentModal.errorMessage
  );
  /* eslint-enable */

  const handleHideExperimentModal = () => dispatch(hideNewExperimentModal());
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
      visible={modalVisible}
      handleCloseModal={handleHideExperimentModal}
      handleNewExperiment={newExperimentHandler}
      loading={loading}
      modalValidateStatus={modalValidateStatus}
      errorMessage={errorMessage}
    />
  );
};

export default NewExperimentModalContainer;
