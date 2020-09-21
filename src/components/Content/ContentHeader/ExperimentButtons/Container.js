// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentButtons from './index';

// ACTIONS
import { fetchExperimentDeployStatusRequest } from '../../../../store/experiment/actions';
import { deployExperimentRequest } from '../../../../store/pipelines/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
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
    experiment: state.experimentReducer,
    operators: state.operatorsReducer,
    project: state.projectReducer,
    loading: state.uiReducer.experimentName.loading,
    trainingLoading: state.uiReducer.experimentTraining.loading,
  };
};

/**
 * Experiment Buttons Container.
 * This component is responsible for create a logic container for experiment
 * buttons with redux.
 */
const ExperimentButtonsContainer = ({
  experiment,
  operators,
  project,
  loading,
  trainingLoading,
  handleDeployExperiment,
  handleFetchExperimentDeployStatus,
}) => {
  // CONSTANTS
  const { experimentId } = useParams();
  const { deployStatus, succeeded: trainingSucceeded } = experiment;

  // Checks if the experiment has, at least, one non DATASET operator
  const hasExecutorOperator = operators
    .map((operator) => {
      return operator.tags.includes('DATASETS') && operator.tags.length > 0;
    })
    .every((value) => value === true);

  // HOOKS
  // did mount hook
  useEffect(() => {
    const polling = setInterval(
      () => handleFetchExperimentDeployStatus(experimentId),
      5000
    );
    return () => clearInterval(polling);
  });

  // HANDLERS
  const deployExperimentHandler = () =>
    handleDeployExperiment(project, experiment, operators);

  // RENDER
  return (
    <ExperimentButtons
      handleClick={deployExperimentHandler}
      disabled={
        hasExecutorOperator ||
        loading ||
        trainingLoading ||
        !trainingSucceeded ||
        deployStatus === 'Succeeded' ||
        deployStatus === 'Running'
      }
      loading={deployStatus === 'Running'}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentButtonsContainer)
);
