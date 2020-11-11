// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import NewExperimentButton from './index';

// ACTIONS
import { fetchShowNewExperimentModal } from '../../../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowModal: () => dispatch(fetchShowNewExperimentModal()),
  };
};

/**
 * New Experiment Button Container.
 * This component is responsible for create a logic container for create new
 * experiment button with redux.
 */
const NewExperimentButtonContainer = ({ handleShowModal }) => (
  <NewExperimentButton disabled={false} handleClick={handleShowModal} />
);

// EXPORT
export default connect(null, mapDispatchToProps)(NewExperimentButtonContainer);
