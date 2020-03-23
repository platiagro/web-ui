// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentFlow from './index';

// ACTIONS
import {
  fetchOperatorsRequest,
  removeOperator,
  setOperatorParams,
} from '../../../../../../store/operators/actions';

import { showOperatorDetails } from '../../../../../../store/operator/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // fetch operators action
    handleFetchOperators: (projectId, experimentId) =>
      dispatch(fetchOperatorsRequest(projectId, experimentId)),
    // show operator details action
    handleShowOperatorDetails: (operator) =>
      dispatch(showOperatorDetails(operator)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return { operators: state.operators };
};

// TODO: Implementar "Conexão" Drawer
// TODO: Implementar "setagem" de parâmetros para tarefa
// TODO: Implementar excluir tarefa
/**
 * Experiment Flow Container.
 * This component is responsible for create a logic container for experiment flow
 * with redux.
 */
const ExperimentFlowContainer = ({
  operators,
  handleFetchOperators,
  handleShowOperatorDetails,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching projects
    handleFetchOperators(projectId, experimentId);
  }, []);

  // RENDER
  return (
    <ExperimentFlow
      components={operators}
      handleTaskBoxClick={handleShowOperatorDetails}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentFlowContainer);
