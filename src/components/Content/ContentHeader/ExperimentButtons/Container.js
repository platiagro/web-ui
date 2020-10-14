// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentButtons from './index';

// ACTIONS
import { fetchExperimentDeployStatusRequest } from 'store/experiment/actions';
import { deployExperimentRequest } from 'store/pipelines/actions';
import { changeVisibilityCompareResultsModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleDeployExperiment: (project, experiment, operators) =>
      dispatch(
        deployExperimentRequest(project, experiment, operators, routerProps)
      ),
    handleFetchExperimentDeployStatus: (experimentId) =>
      dispatch(fetchExperimentDeployStatusRequest(experimentId)),
    handleChangeVisibilityCompareResultsModal: () => {
      dispatch(changeVisibilityCompareResultsModal(true));
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
  operators,
  project,
  loading,
  trainingLoading,
  handleDeployExperiment,
  handleFetchExperimentDeployStatus,
  handleChangeVisibilityCompareResultsModal,
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
  const deployExperimentHandler = () =>
    handleDeployExperiment(project, experiment, operators);

  // RENDER
  return (
    <ExperimentButtons
      handleClick={deployExperimentHandler}
      handleCompareResultsClick={handleChangeVisibilityCompareResultsModal}
      disabled={
        !hasExecutorOperator ||
        loading ||
        trainingLoading ||
        hasFailed ||
        deployStatus
      }
      loading={deployStatus === 'Running'}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentButtonsContainer)
);
