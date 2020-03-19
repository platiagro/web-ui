// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ACTIONS
import { createExperimentRequest } from '../../../../store/experiment/actions';

// COMPONENTS
import NewExperimentModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleCreateExperiment: (experimentName) =>
      dispatch(createExperimentRequest(experimentName, routerProps)),
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
}) => (
  <NewExperimentModal
    visible={visible}
    handleCloseModal={handleCloseModal}
    handleNewExperiment={handleCreateExperiment}
  />
);

// EXPORT
export default withRouter(
  connect(null, mapDispatchToProps)(NewExperimentModalContainer)
);
