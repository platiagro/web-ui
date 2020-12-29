// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentButtons from './index';

// ACTIONS
import { fetchOperatorsRequest } from 'store/operators/actions';
import deploymentRunsActions from 'store/deployments/deploymentRuns/actions';
import { createDeploymentRequest} from 'store/deployments/actions'
import { changeVisibilityCompareResultsModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchOperators: (projectId, experimentId) =>
      dispatch(fetchOperatorsRequest(projectId, experimentId)),
    handleCreateDeploymentRequest: (experiment, project) =>
      dispatch(
        createDeploymentRequest(
          experiment.uuid,
          experiment.name,
          project.uuid,
          project.name,
        )
      ),
    handleFetchDeploymentStatus: (projectId, experimentId) =>
      dispatch(
        deploymentRunsActions.fetchDeploymentRunsRequest(projectId, experimentId)
      ),
    handleCompareResultsClick: () => {
      dispatch(changeVisibilityCompareResultsModal(true));
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operators: state.operatorsReducer,
    experiments: state.experimentsReducer,
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
  experiments,
  loading,
  operators,
  project,
  trainingLoading,
  handleCompareResultsClick,
  handleFetchOperators,
  handleCreateDeploymentRequest,
  handleFetchDeploymentStatus,
}) => {
  const { projectId, experimentId } = useParams();
  let deployStatus = false;
  
  const experiment = experiments.find((experiment) => {
    return experiment.uuid === experimentId;
  });

  if (experiment)
    deployStatus = experiment.deployStatus;

  // Checks if the experiment has, at least, one non DATASET operator
  const hasExecutorOperator = operators.some((operator) => {
    return !operator.tags.includes('DATASETS') && operator.tags.length > 0;
  });

  // Check if any operator has failed
  const hasFailed = operators.some((operator) => {
    return operator.status === 'Failed';
  });

  // HOOKS
  // did mount hooks
  useEffect(() => {
    const polling = setInterval(
      () => handleFetchDeploymentStatus(projectId, experimentId),
      5000
    );
    return () => clearInterval(polling);
  });

  useEffect(() => {
    if (experimentId) {
      handleFetchOperators(projectId, experimentId);
    }
  }, [projectId, experimentId, handleFetchOperators]);

  // HANDLERS
  const handleDeploymentClick = () =>
    handleCreateDeploymentRequest(experiment, project);

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
