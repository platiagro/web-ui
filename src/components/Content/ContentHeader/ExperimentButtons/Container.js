// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentButtons from './index';

// ACTIONS
import { fetchExperimentDeployStatusRequest } from 'store/experiment/actions';
import { deployExperimentRequest } from 'store/pipelines/actions';
import { fetchChangeVisibilityCompareResultsModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleDeployExperiment: (project, experiment, operators) =>
      dispatch(
        deployExperimentRequest(project, experiment, operators, routerProps)
      ),
    handleFetchExperimentDeployStatus: (experimentId) =>
      dispatch(fetchExperimentDeployStatusRequest(experimentId)),
    handleCompareResultsClick: () => {
      dispatch(fetchChangeVisibilityCompareResultsModal(true));
    },
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
  loading,
  operators,
  project,
  trainingLoading,
  handleCompareResultsClick,
  handleDeployExperiment,
  handleFetchExperimentDeployStatus,
}) => {
  // CONSTANTS
  const { experimentId } = useParams();
  const { deployStatus } = experiment;

  // Checks if the experiment has, at least, one non DATASET operator
  const hasExecutorOperator = operators.some((operator) => {
    return !operator.tags.includes('DATASETS') && operator.tags.length > 0;
  });

  // Check if any operator has failed
  const hasFailed = operators.some((operator) => {
    return operator.status === 'Failed';
  });

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
  const handleDeploymentClick = () =>
    handleDeployExperiment(project, experiment, operators);

  // RENDER
  return (
    <ExperimentButtons
      disabled={
        !hasExecutorOperator ||
        loading ||
        trainingLoading ||
        hasFailed ||
        deployStatus
      }
      loading={deployStatus === 'Running'}
      onCompareResultsClick={handleCompareResultsClick}
      onDeploymentClick={handleDeploymentClick}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentButtonsContainer)
);
