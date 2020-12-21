import React from 'react';
import { connect } from 'react-redux';
import DeploymentFlowComponent from './DeploymentFlow.component';

/**
 * Container do Fluxo de pré-implantação/implantação.
 */
function DeploymentFlow(props) {
  return <DeploymentFlowComponent {...props}/>;
}

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return { };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operators: state.operatorsReducer,    
    loading: state.uiReducer.experimentOperators.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeploymentFlow);
