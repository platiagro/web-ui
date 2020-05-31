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
      dispatch(fetchExperimentRequest(projectId, experimentId)),
    handleEditExperimentName: (projectId, experimentId, newName) =>
      dispatch(editExperimentNameRequest(projectId, experimentId, newName)),
    handleTrainExperiment: (experiment, operators) =>
      dispatch(trainExperimentRequest(experiment, operators)),
    handleDeployExperiment: (experiment, operators) =>
      dispatch(deployExperimentRequest(experiment, operators, routerProps)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    experiment: state.experiment,
    operators: state.operators,
    loading: state.ui.experimentName.loading,
    trainingLoading: state.ui.experimentTraining.loading,
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
  loading,
  trainingLoading,
  handleDeleteExperiment,
  handleFetchExperiment,
  handleEditExperimentName,
  handleTrainExperiment,
  handleDeployExperiment,
}) => {
  // CONSTANTS
  // getting project uuid
  const { projectId, experimentId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching projects
    handleFetchExperiment(projectId, experimentId);
  }, []);

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
    handleDeployExperiment(experiment, operators);

  // RENDER
  return (
    <ExperimentHeader
      title={experiment.name}
      trainingLoading={trainingLoading}
      trainingSucceeded={experiment.succeeded}
      handleEditExperimentName={editExperimentNameHandler}
      handleDeleteExperiment={deleteHandler}
      handleTrainExperiment={trainExperimentHandler}
      handleDeployExperiment={deployExperimentHandler}
      loading={loading}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentHeaderContainer)
);
