// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentButtons from './index';

// ACTIONS
import deploymentRunsActions from 'store/deployments/deploymentRuns/actions';
import { changeVisibilityCompareResultsModal, showPreImplantationModal } from 'store/ui/actions';
import { getExperimentById } from 'store/experiments/experimentsReducer';


// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchDeploymentStatus: (projectId, experimentId) =>
      dispatch(
        deploymentRunsActions.fetchDeploymentRunsRequest(projectId, experimentId)
      ),
    handleCompareResultsClick: () => {
      dispatch(changeVisibilityCompareResultsModal(true));
    },
    handleOpenModal: () => {dispatch(showPreImplantationModal())}
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
  trainingLoading,
  handleCompareResultsClick,
  handleFetchOperators,
  handleCreateDeploymentRun,
  handleFetchDeploymentStatus,
  handleOpenModal,

}) => {
  const { experimentId } = useParams();
  let deployStatus = false;
  
  const experiment = experiments.find((experiment_) => {
    return experiment_.uuid === experimentId;
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

  // HANDLERS
  const handleDeploymentClick = () =>
    handleOpenModal()
    //handleCreateDeploymentRun(projectId, experimentId);


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
