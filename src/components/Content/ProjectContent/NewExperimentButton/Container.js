// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import NewExperimentButton from './index';

// ACTIONS
import { createExperiment } from '../../../../store/experiments/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateExperiment: () => dispatch(createExperiment()),
  };
};

/**
 * New Experiment Button Container.
 * This component is responsible for create a logic container for create new
 * experiment button with redux.
 */
const NewExperimentButtonContainer = ({ handleCreateExperiment }) => (
  <NewExperimentButton disabled={false} handleClick={handleCreateExperiment} />
);

// EXPORT
export default connect(null, mapDispatchToProps)(NewExperimentButtonContainer);
