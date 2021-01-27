// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { PrepareDeploymentsModal } from 'components/Modals';

// ACTIONS
import { hidePrepareDeploymentsModal } from 'store/ui/actions';
import { prepareDeployments } from 'store/deployments/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleCloseModal: () => dispatch(hidePrepareDeploymentsModal()),
    handlePrepareDeployments: (experimentId, projectId) => {
      dispatch(prepareDeployments(experimentId, projectId, routerProps));
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    visible: state.uiReducer.prepareDeploymentsModal.visible,
    experiments: state.experimentsReducer,
  };
};

/**
 * Container to display using deployments modal.
 *
 * @param {object} props Container props
 * @returns {PrepareDeploymentsModalContainer} Container
 */
const PrepareDeploymentsModalContainer = (props) => {
  const {
    handlePrepareDeployments,
    handleCloseModal,
    experiments,
    visible,
  } = props;

  return (
    <PrepareDeploymentsModal
      visible={visible}
      loading={false}
      experiments={experiments}
      onClose={handleCloseModal}
      onConfirm={handlePrepareDeployments}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrepareDeploymentsModalContainer);
