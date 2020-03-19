// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentHeader from './index';

// ACTIONS
import {
  fetchExperimentRequest,
  editExperimentNameRequest,
  trainExperiment,
  deployExperiment,
  deleteExperiment,
} from '../../../../../../store/experiment/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteExperiment: (experimentId) =>
      dispatch(deleteExperiment(experimentId)),
    handleFetchExperiment: (projectId, experimentId) =>
      dispatch(fetchExperimentRequest(projectId, experimentId)),
    handleEditExperimentName: (projectId, experimentId, newName) =>
      dispatch(editExperimentNameRequest(projectId, experimentId, newName)),
    handleTrainExperiment: (experimentId) =>
      dispatch(trainExperiment(experimentId)),
    handleDeployExperiment: (experimentId) =>
      dispatch(deployExperiment(experimentId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return { experiment: state.experiment };
};

/**
 * Experiment Header Container.
 * This component is responsible for create a logic container for experiment
 * header with redux.
 */
const ExperimentHeaderContainer = ({
  experiment,
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
  const deleteHandler = () => handleDeleteExperiment(experimentId);
  // edit experiment name
  const editExperimentNameHandler = (newName) =>
    handleEditExperimentName(projectId, experimentId, newName);

  // RENDER
  return (
    <ExperimentHeader
      title={experiment.name}
      handleEditExperimentName={editExperimentNameHandler}
      handleDeleteExperiment={deleteHandler}
      handleTrainExperiment={handleTrainExperiment}
      handleDeployExperiment={handleDeployExperiment}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentHeaderContainer);
