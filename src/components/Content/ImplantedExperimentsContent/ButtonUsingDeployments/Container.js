// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import ButtonUsingDeployments from './index';

// ACTIONS
import { showUsingDeploymentsModal } from '../../../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowModal: () => dispatch(showUsingDeploymentsModal()),
  };
};

/**
 * UsingDeployments Button Container.
 * This component is responsible for create a logic container for create
 * UsingDeployments button with redux.
 */
const ButtonUsingDeploymentsContainer = ({ handleShowModal }) => (
  <ButtonUsingDeployments handleClick={handleShowModal} />
);

// EXPORT
export default connect(
  null,
  mapDispatchToProps
)(ButtonUsingDeploymentsContainer);
