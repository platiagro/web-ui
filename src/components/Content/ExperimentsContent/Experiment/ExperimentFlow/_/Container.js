// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentFlow from './index';

// ACTIONS
import { selectOperator } from '../../../../../../store/operator/actions';
import { getTrainExperimentStatusRequest } from '../../../../../../store/pipelines/actions';
import {
  deselectOperator,
  fetchSaveOperatorPosition,
  fetchSaveOperatorDependencies,
} from '../../../../../../store/operator/actions';
import { useStoreState } from 'react-flow-renderer';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    // show operator details action
    handleShowOperatorDetails: (projectId, experimentId, operator, page) =>
      dispatch(selectOperator(projectId, experimentId, operator, page)),
    // getting training experiment status
    handleGetTrainExperimentStatus: (experimentId) =>
      dispatch(getTrainExperimentStatusRequest(experimentId)),
    handleDeselectOperator: () => dispatch(deselectOperator()),
    // saving operator position
    handleSaveOperatorPosition: (
      projectId,
      experimentId,
      operatorId,
      position
    ) =>
      dispatch(
        fetchSaveOperatorPosition(projectId, experimentId, operatorId, position)
      ),
    handleSaveOperatorDependencies: (
      projectId,
      experimentId,
      operatorId,
      dependencies,
      operators
    ) =>
      dispatch(
        fetchSaveOperatorDependencies(
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
    datasetName: state.experimentReducer.dataset,
    loading: state.uiReducer.experimentOperators.loading,
    arrowConfigs: state.uiReducer.operatorsDependencies,
  };
};

// CONSTANTS
// polling time in miliseconds;
const pollingTime = 5000;

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
  handleGetTrainExperimentStatus,
  handleDeselectOperator,
  handleSaveOperatorPosition,
  handleSaveOperatorDependencies,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();

  const transformations = useStoreState((flowStore) => flowStore.transform);

  // HOOKS
  // did mount hook
  useEffect(() => {
    // polling experiment status
    const polling = setInterval(
      () => handleGetTrainExperimentStatus(experimentId),
      pollingTime
    );

    return () => clearInterval(polling);
  });

  const selectOperatorHandler = (operator) =>
    handleShowOperatorDetails(projectId, experimentId, operator, 1);

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
