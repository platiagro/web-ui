// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentHeader from './index';

// ACTIONS
import experimentsActions from 'store/projects/experiments/actions';
import { fetchOperatorsRequest } from 'store/operators/actions';
import { removeOperatorRequest } from 'store/operator/actions';
import experimentRunsActions from 'store/projects/experiments/experimentRuns/actions';
import { getExperimentById } from 'store/projects/experiments/experimentsReducer';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchOperators: (projectId, experimentId) =>
      dispatch(fetchOperatorsRequest(projectId, experimentId)),
    handleEditExperimentName: (projectId, experimentId, newName) =>
      dispatch(
        experimentsActions.updateExperimentName(
          projectId,
          experimentId,
          newName
        )
      ),
    handleCreateExperimentRun: (projectId, experimentId) =>
      dispatch(
        experimentRunsActions.createExperimentRunRequest(
          projectId,
          experimentId,
          routerProps
        )
      ),
    handleDeleteExperimentRun: (projectId, experimentId) =>
      dispatch(
        experimentRunsActions.deleteExperimentRunRequest(
          projectId,
          experimentId
        )
      ),
    handleRemoveOperator: (projectId, experimentId, operator) =>
      dispatch(removeOperatorRequest(projectId, experimentId, operator)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    experiment: (experimentId) => {
      return getExperimentById(state, experimentId);
    },
    operators: state.operatorsReducer,
    operator: state.operatorReducer,
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
  operator,
  loading,
  trainingLoading,
  deleteTrainingLoading,
  handleRemoveOperator,
  handleEditExperimentName,
  handleFetchOperators,
  handleCreateExperimentRun,
  handleDeleteExperimentRun,
}) => {
  const { projectId, experimentId } = useParams();

  // select experiment
  experiment(experimentId);

  // HOOKS
  // did mount hook
  useEffect(() => {
    if (experimentId) {
      handleFetchOperators(projectId, experimentId);
    }
  }, [projectId, experimentId, handleFetchOperators]);

  // HANDLERS
  const editExperimentNameHandler = (newName) =>
    handleEditExperimentName(projectId, experimentId, newName);
  const trainExperimentHandler = () =>
    handleCreateExperimentRun(projectId, experimentId);
  const deleteTrainExperimentHandler = () =>
    handleDeleteExperimentRun(projectId, experimentId);
  const removeOperatorHandler = () =>
    handleRemoveOperator(projectId, experimentId, operator);

  // RENDER
  return (
    <ExperimentHeader
      title={experiment.name}
      empty={operators.length <= 0}
      loading={loading}
      operator={operator}
      trainingLoading={trainingLoading}
      deleteTrainingLoading={deleteTrainingLoading}
      handleEditExperimentName={editExperimentNameHandler}
      handleTrainExperiment={trainExperimentHandler}
      handleDeleteTrainExperiment={deleteTrainExperimentHandler}
      handleRemoveOperator={removeOperatorHandler}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentHeaderContainer)
);
