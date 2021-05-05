// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import { PrepareDeploymentsModal } from 'components/Modals';

// ACTIONS
import { hidePrepareDeploymentsModal } from 'store/ui/actions';
import { prepareDeployments } from 'store/deployments/actions';

import { Selectors } from 'store/projects/experiments';

const { getExperiments } = Selectors;

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleCloseModal: () => dispatch(hidePrepareDeploymentsModal()),
    handlePrepareDeployments: (experiments, projectId) => {
      dispatch(prepareDeployments(experiments, projectId, routerProps));
    },
  };
};

// STATES
const mapStateToProps = (state, ownProps) => {
  const { projectId } = ownProps.match.params;

  return {
    visible: state.uiReducer.prepareDeploymentsModal.visible,
    experiments: getExperiments(state, projectId),
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

  const { projectId } = useParams();

  const handleConfirm = (values) => {
    const experimentsArray = Object.keys(values).filter(
      (el) => values[el] === true
    );
    if (experimentsArray.length > 0) {
      handlePrepareDeployments(experimentsArray, projectId);
    }
  };

  return (
    <PrepareDeploymentsModal
      visible={visible}
      loading={false}
      experiments={experiments}
      onClose={handleCloseModal}
      onConfirm={handleConfirm}
    />
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrepareDeploymentsModalContainer)
);
