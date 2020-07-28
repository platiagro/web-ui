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
  deleteExperimentRequest,
  fetchExperimentDeployStatusRequest,
} from '../../../../../../store/experiment/actions';
// pipelines
import {
  trainExperimentRequest,
  deployExperimentRequest,
} from '../../../../../../store/pipelines/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleDeleteExperiment: (projectId, experimentId) =>
      dispatch(deleteExperimentRequest(projectId, experimentId, routerProps)),
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
  handleDeleteExperiment,
  handleFetchExperiment,
  handleEditExperimentName,
  handleTrainExperiment,
  handleDeployExperiment,
  handleFetchExperimentDeployStatus,
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
  // delete experiment
  const deleteHandler = () => handleDeleteExperiment(projectId, experimentId);
  // edit experiment name
  const editExperimentNameHandler = (newName) =>
    handleEditExperimentName(projectId, experimentId, newName);
  // edit experiment name
  const trainExperimentHandler = () =>
    handleTrainExperiment(experiment, operators);
  // edit experiment name
  const deployExperimentHandler = () =>
    handleDeployExperiment(project, experiment, operators);

  // RENDER
  return (
    <ExperimentHeader
      title={experiment.name}
      trainingLoading={trainingLoading}
      trainingSucceeded={experiment.succeeded}
      deployStatus={experiment.deployStatus}
      handleEditExperimentName={editExperimentNameHandler}
      handleDeleteExperiment={deleteHandler}
      handleTrainExperiment={trainExperimentHandler}
      handleDeployExperiment={deployExperimentHandler}
      loading={loading}
      empty={operators.length < 2}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentHeaderContainer)
);
