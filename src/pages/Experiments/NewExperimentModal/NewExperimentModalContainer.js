// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// ACTIONS
import {
  Actions as experimentsActions,
  EXPERIMENTS_TYPES,
} from 'store/projects/experiments';
import { hideNewExperimentModal } from 'store/ui/actions';

import { useIsLoading } from 'hooks';

// COMPONENTS
import NewExperimentModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    // create experiment action
    handleCreateExperiment: (projectId, experimentName, copyFrom, duplicate) =>
      dispatch(
        experimentsActions.createExperimentRequest(
          projectId,
          { name: experimentName, copyFrom },
          duplicate,
          routerProps.history
        )
      ),
    // hide modal action
    handleHideExperimentModal: () => dispatch(hideNewExperimentModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    modalVisible: state.uiReducer.newExperimentModal.visible,
    modalValidateStatus: state.uiReducer.newExperimentModal.modalValidateStatus,
    errorMessage: state.uiReducer.newExperimentModal.errorMessage,
  };
};

/**
 * New Experiment Modal Container.
 * This component is responsible for create a logic container for new experiment
 * modal with redux.
 */
const NewExperimentModalContainer = ({
  modalVisible,
  modalValidateStatus,
  errorMessage,
  handleHideExperimentModal,
  handleCreateExperiment,
}) => {
  // CONSTANTS
  const { projectId } = useParams();

  // HANDLERS
  const newExperimentHandler = (experimentName, copyFrom) => {
    handleCreateExperiment(projectId, experimentName, copyFrom, false);
  };

  const loading = useIsLoading(EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST);

  // RENDER
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

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewExperimentModalContainer)
);
