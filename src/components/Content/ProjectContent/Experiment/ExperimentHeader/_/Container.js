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
} from '../../../../../../store/experiment/actions';
// pipelines
import {
  trainExperimentRequest,
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
    handleDeleteTrainExperiment: (experimentId) =>
      dispatch(deleteTrainExperiment(experimentId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
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
  experiment,
  operators,
  loading,
  trainingLoading,
  deleteTrainingLoading,
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
    // fetching projects
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

  // RENDER
  return (
    <ExperimentHeader
      title={experiment.name}
      empty={operators.length < 2}
      loading={loading}
      trainingLoading={trainingLoading}
      deleteTrainingLoading={deleteTrainingLoading}
      handleEditExperimentName={editExperimentNameHandler}
      handleTrainExperiment={trainExperimentHandler}
      handleDeleteTrainExperiment={deleteTrainExperimentHandler}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentHeaderContainer)
);
