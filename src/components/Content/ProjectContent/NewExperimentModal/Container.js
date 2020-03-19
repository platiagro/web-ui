// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// ACTIONS
import { createExperimentRequest } from '../../../../store/experiment/actions';

// COMPONENTS
import NewExperimentModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleCreateExperiment: (projectId, experimentName) =>
      dispatch(createExperimentRequest(projectId, experimentName, routerProps)),
  };
};

/**
 * New Experiment Modal Container.
 * This component is responsible for create a logic container for new experiment
 * modal with redux.
 */
const NewExperimentModalContainer = ({
  visible,
  handleCloseModal,
  handleCreateExperiment,
}) => {
  // CONSTANTS
  const { projectId } = useParams();

  // HANDLERS
  const newExperimentHandler = (experimentName) => {
    handleCreateExperiment(projectId, experimentName);
    handleCloseModal();
  };

  // RENDER
  return (
    <NewExperimentModal
      visible={visible}
      handleCloseModal={handleCloseModal}
      handleNewExperiment={newExperimentHandler}
    />
  );
};

// EXPORT
export default withRouter(
  connect(null, mapDispatchToProps)(NewExperimentModalContainer)
);
