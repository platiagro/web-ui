import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import { hideNewExperimentModal } from '.store/ui/actions';

import DeploymentsModal from './index';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // close modal action
    //handleCloseModal: () => dispatch(hideNewProjectModal()),
  };
};

const mapStateToProps = (state) => {
  // new project modal visible
  return {
    visible: state.ui.newDeploymentsModal.visible,
    title: state.ui.newDeploymentsModal.title,
    text: state.ui.newDeploymentsModal.text,
  };
};

/**
 * New Project Modal Container.
 * This component is responsible for create a logic container for new project
 * modal with redux.
 */
const newDeploymentsModalContainer = ({ visible, handleCloseModal }) => (
  <DeploymentsModal
    visible={true}
    handleCloseModal={handleCloseModal}
    title='Titulo Ex.'
  >
    hsdsjdhjdshsjdhs
  </DeploymentsModal>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(newDeploymentsModalContainer);
