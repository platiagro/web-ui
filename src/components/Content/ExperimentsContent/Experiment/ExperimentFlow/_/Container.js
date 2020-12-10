// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentFlow from './index';

// ACTIONS

import {
  selectOperator,
  deselectOperator,
  saveOperatorPosition,
  saveOperatorDependencies
} from 'store/operator/actions';

import { useStoreState } from 'react-flow-renderer';
import { fetchExperimentRunStatusRequest } from 'store/experiments/experimentRuns/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowOperatorDetails: (projectId, experimentId, operator) =>
      dispatch(selectOperator(projectId, experimentId, operator)),
    handleFetchExperimentRunStatus: (projectId, experimentId) =>
      dispatch(fetchExperimentRunStatusRequest(projectId, experimentId)),
    handleDeselectOperator: () => dispatch(deselectOperator()),
    handleSaveOperatorPosition: (
      projectId,
      experimentId,
      operatorId,
      position
    ) =>
      dispatch(
        saveOperatorPosition(projectId, experimentId, operatorId, position)
      ),
    handleSaveOperatorDependencies: (
      projectId,
      experimentId,
      operatorId,
      dependencies,
      operators
    ) =>
      dispatch(
        saveOperatorDependencies(
          projectId,
          experimentId,
          operatorId,
          dependencies,
          operators
        )
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operators: state.operatorsReducer,
    loading: state.uiReducer.experimentOperators.loading,
    arrowConfigs: state.uiReducer.operatorsDependencies,
  };
};

/**
 * Experiment Flow Container.
 * This component is responsible for create a logic container for experiment flow
 * with redux.
 */
const ExperimentFlowContainer = ({
  operators,
  loading,
  arrowConfigs,
  handleShowOperatorDetails,
  handleFetchExperimentRunStatus,
  handleDeselectOperator,
  handleSaveOperatorPosition,
  handleSaveOperatorDependencies,
}) => {
  const { projectId, experimentId } = useParams();
  const transformations = useStoreState((flowStore) => flowStore.transform);

  // HOOKS
  // did mount hook
  useEffect(() => {
    // polling experiment status
    const polling = setInterval(
      () => handleFetchExperimentRunStatus(projectId, experimentId),
      5000
    );
    return () => clearInterval(polling);
  });

  const selectOperatorHandler = (operator) =>
    handleShowOperatorDetails(projectId, experimentId, operator);

  const handleSavePosition = (operatorId, position) => {
    handleSaveOperatorPosition(projectId, experimentId, operatorId, position);
  };

  const handleSaveDependencies = (operatorId, dependencies) => {
    handleSaveOperatorDependencies(
      projectId,
      experimentId,
      operatorId,
      dependencies,
      operators
    );
  };

  // RENDER
  return (
    <ExperimentFlow
      tasks={operators}
      loading={loading}
      handleTaskBoxClick={selectOperatorHandler}
      handleDeselectOperator={handleDeselectOperator}
      handleSavePosition={handleSavePosition}
      handleSaveDependencies={handleSaveDependencies}
      transformations={transformations}
      arrowConfigs={arrowConfigs}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentFlowContainer);
