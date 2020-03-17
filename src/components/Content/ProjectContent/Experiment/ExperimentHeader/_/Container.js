// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentHeader from './index';

// ACTIONS
import { deleteExperiment } from '../../../../../../store/experiments/actions';
import {
  fetchExperiment,
  editExperimentName,
  trainExperiment,
  deployExperiment,
} from '../../../../../../store/experiment/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteExperiment: (experimentUuid) =>
      dispatch(deleteExperiment(experimentUuid)),
    handleFetchExperiment: (experimentUuid) =>
      dispatch(fetchExperiment(experimentUuid)),
    handleEditExperimentName: (experimentUuid, newName) =>
      dispatch(editExperimentName(experimentUuid, newName)),
    handleTrainExperiment: (experimentUuid) =>
      dispatch(trainExperiment(experimentUuid)),
    handleDeployExperiment: (experimentUuid) =>
      dispatch(deployExperiment(experimentUuid)),
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
  const { experimentUuid } = useParams();

  // HOOKS
  // did mount hook
  useLayoutEffect(() => {
    // fetching projects
    handleFetchExperiment(experimentUuid);
  }, []);

  // HANDLERS
  // delete experiment
  const deleteHandler = () => handleDeleteExperiment(experimentUuid);
  // edit experiment name
  const editExperimentNameHandler = (newName) =>
    handleEditExperimentName(experimentUuid, newName);

  // RENDER
  return (
    <ExperimentHeader
      title={experiment.title}
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
