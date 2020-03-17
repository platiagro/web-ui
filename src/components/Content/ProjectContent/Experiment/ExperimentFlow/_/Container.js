// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentFlow from './index';

// ACTIONS
import {
  fetchFlowTasks,
  removeFlowTask,
  setFlowTaskParams,
} from '../../../../../../store/experimentFlow/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchFlowTasks: (experimentUuid) =>
      dispatch(fetchFlowTasks(experimentUuid)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return { flowTasks: state.experimentFlow };
};

// TODO: Implementar "Conexão" Drawer
// TODO: Implementar "setagem" de parâmetros para tarefa
// TODO: Implementar excluir tarefa
/**
 * Experiment Flow Container.
 * This component is responsible for create a logic container for experiment flow
 * with redux.
 */
const ExperimentFlowContainer = ({ flowTasks, handleFetchFlowTasks }) => {
  // CONSTANTS
  // getting experiment uuid
  const { experimentUuid } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching projects
    handleFetchFlowTasks(experimentUuid);
  }, []);

  // RENDER
  return (
    <ExperimentFlow
      components={flowTasks}
      handleTaskBoxClick={(taskUuid) => alert(taskUuid)}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentFlowContainer);
