// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentHeader from './index';

// ACTIONS
// experiment
import {
  fetchExperimentRequest,
  editExperimentNameRequest,
  fetchExperimentDeployStatusRequest,
} from '../../../../../../store/experiment/actions';
// pipelines
import {
  trainExperimentRequest,
  deployExperimentRequest,
  deleteTrainExperiment,
} from '../../../../../../store/pipelines/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchExperiment: (projectId, experimentId) =>
      dispatch(fetchExperimentRequest(projectId, experimentId, routerProps)),
    handleEditExperimentName: (projectId, experimentId, newName) =>
      dispatch(editExperimentNameRequest(projectId, experimentId, newName)),
    handleTrainExperiment: (experiment, operators) =>
      dispatch(trainExperimentRequest(experiment, operators)),
    handleDeployExperiment: (project, experiment, operators) =>
      dispatch(
        deployExperimentRequest(project, experiment, operators, routerProps)
      ),
    handleFetchExperimentDeployStatus: (experimentId) =>
      dispatch(fetchExperimentDeployStatusRequest(experimentId)),
    handleDeleteTrainExperiment: (experimentId) =>
      dispatch(deleteTrainExperiment(experimentId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    experiment: state.experimentReducer,
    operators: state.operatorsReducer,
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
  project,
  experiment,
  operators,
  loading,
  trainingLoading,
  deleteTrainingLoading,
  handleFetchExperiment,
  handleEditExperimentName,
  handleTrainExperiment,
  handleDeployExperiment,
  handleFetchExperimentDeployStatus,
  handleDeleteTrainExperiment,
}) => {
  // CONSTANTS
  // getting project uuid
  const { projectId, experimentId } = useParams();
  // polling time in miliseconds;
  const pollingTime = 5000;

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching projects
    if (experimentId) {
      handleFetchExperiment(projectId, experimentId);
    }
  }, [experimentId, projectId, handleFetchExperiment]);

  // HOOKS
  // did mount hook
  useEffect(() => {
    // polling experiment deploy status
    const polling = setInterval(
      () => handleFetchExperimentDeployStatus(experimentId),
      pollingTime
    );

    return () => clearInterval(polling);
  });

  // HANDLERS
  // edit experiment name
  const editExperimentNameHandler = (newName) =>
    handleEditExperimentName(projectId, experimentId, newName);
  // train experiment
  const trainExperimentHandler = () =>
    handleTrainExperiment(experiment, operators);
  // deploy experiment
  const deployExperimentHandler = () =>
    handleDeployExperiment(project, experiment, operators);
  // delete train experiment
  const deleteTrainExperimentHandler = () =>
    handleDeleteTrainExperiment(experiment.uuid);

  // RENDER
  return (
    <ExperimentHeader
      title={experiment.name}
      empty={operators.length < 2}
      loading={loading}
      trainingLoading={trainingLoading}
      trainingSucceeded={experiment.succeeded}
      deployStatus={experiment.deployStatus}
      deleteTrainingLoading={deleteTrainingLoading}
      handleEditExperimentName={editExperimentNameHandler}
      handleTrainExperiment={trainExperimentHandler}
      handleDeployExperiment={deployExperimentHandler}
      handleDeleteTrainExperiment={deleteTrainExperimentHandler}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentHeaderContainer)
);
