// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { UsingDeploymentsButton } from 'components/Buttons';

// ACTIONS
import { showUsingDeploymentsModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowModal: () => dispatch(showUsingDeploymentsModal()),
  };
};

/**
 * Container to display using deployments button.
 * @param {object} props Container props
 * @returns {UsingDeploymentsButtonContainer} Container
 */
const UsingDeploymentsButtonContainer = (props) => {
  const { handleShowModal } = props;
  return <UsingDeploymentsButton onClick={handleShowModal} />;
};

// EXPORT
export default connect(
  null,
  mapDispatchToProps
)(UsingDeploymentsButtonContainer);
