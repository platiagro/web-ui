// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentHeader from './index';

// ACTIONS
// operator
import { deleteOperatorRequest } from 'store/operator/actions';
// experiment
import {
  fetchExperimentRequest,
  editExperimentNameRequest,
} from 'store/experiment/actions';
// pipelines
import {
  createExperimentRunRequest,
  fetchDeleteTrainExperiment,
} from 'store/pipelines/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchExperiment: (projectId, experimentId) =>
      dispatch(fetchExperimentRequest(projectId, experimentId, routerProps)),
    handleEditExperimentName: (projectId, experimentId, newName) =>
      dispatch(editExperimentNameRequest(projectId, experimentId, newName)),
    handleTrainExperiment: (experiment, operators) =>
      dispatch(createExperimentRunRequest(experiment, operators)),
    handleDeleteTrainExperiment: (experimentId) =>
      dispatch(fetchDeleteTrainExperiment(experimentId)),
    handleRemoveOperator: (projectId, experimentId, operator) =>
      dispatch(deleteOperatorRequest(projectId, experimentId, operator)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    experiment: state.experimentReducer,
    operators: state.operatorsReducer,
    operator: state.operatorReducer,
    loading: state.uiReducer.experimentName.loading,
    trainingLoading: state.uiReducer.experimentTraining.loading,
    deleteTrainingLoading: state.uiReducer.experimentTraining.deleteLoading,
  };
};

/**
 * Experiment Header Container.
 * This component is responsible for create a logic container for experiment
 * header with redux.
 */
const ExperimentHeaderContainer = ({
  experiment,
  operators,
  operator,
  loading,
  trainingLoading,
  deleteTrainingLoading,
  handleRemoveOperator,
  handleFetchExperiment,
  handleEditExperimentName,
  handleTrainExperiment,
  handleDeleteTrainExperiment,
}) => {
  // CONSTANTS
  // getting project uuid
  const { projectId, experimentId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    if (experimentId) {
      handleFetchExperiment(projectId, experimentId);
    }
  }, [experimentId, projectId, handleFetchExperiment]);

  // HANDLERS
  // edit experiment name
  const editExperimentNameHandler = (newName) =>
    handleEditExperimentName(projectId, experimentId, newName);
  // train experiment
  const trainExperimentHandler = () =>
    handleTrainExperiment(experiment, operators);
  // delete train experiment
  const deleteTrainExperimentHandler = () =>
    handleDeleteTrainExperiment(experiment.uuid);
  // delete operator
  const removeOperatorHandler = () =>
    handleRemoveOperator(projectId, experimentId, operator);

  // RENDER
  return (
    <ExperimentHeader
      title={experiment.name}
      empty={operators.length <= 0}
      loading={loading}
      operator={operator}
      trainingLoading={trainingLoading}
      deleteTrainingLoading={deleteTrainingLoading}
      handleEditExperimentName={editExperimentNameHandler}
      handleTrainExperiment={trainExperimentHandler}
      handleDeleteTrainExperiment={deleteTrainExperimentHandler}
      handleRemoveOperator={removeOperatorHandler}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentHeaderContainer)
);
