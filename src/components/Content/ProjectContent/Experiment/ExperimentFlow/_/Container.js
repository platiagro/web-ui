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
  saveOperatorPosition,
} from '../../../../../../store/operator/actions';
import { saveFlowTransform } from '../../../../../../store/ui/actions';
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
        saveOperatorPosition(projectId, experimentId, operatorId, position)
      ),
    handleSaveFlowTransform: (transform) =>
      dispatch(saveFlowTransform(transform)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operators: state.operatorsReducer,
    datasetName: state.experimentReducer.dataset,
    loading: state.uiReducer.experimentOperators.loading,
    flowTransform: state.uiReducer.flowTransform,
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
  flowTransform,
  handleSaveFlowTransform,
  handleShowOperatorDetails,
  handleGetTrainExperimentStatus,
  handleDeselectOperator,
  handleSaveOperatorPosition,
}) => {
  // CONSTANTS
  // getting experiment uuid
  const { projectId, experimentId } = useParams();
  const transformations = useStoreState((store) => store.transform);
  console.log(transformations);

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

  // RENDER
  return (
    <ExperimentFlow
      tasks={operators}
      loading={loading}
      flowTransform={flowTransform}
      handleSaveFlowTransform={handleSaveFlowTransform}
      handleTaskBoxClick={selectOperatorHandler}
      handleDeselectOperator={handleDeselectOperator}
      handleSavePosition={handleSavePosition}
      transformations={transformations}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentFlowContainer);
