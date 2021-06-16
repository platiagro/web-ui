import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Selectors,
  EXPERIMENTS_TYPES,
  Actions as experimentsActions,
} from 'store/projects/experiments';
import { useIsLoading } from 'hooks';
import { removeOperatorRequest } from 'store/operator';
import { fetchExperimentOperatorsRequest } from 'store/operators';
import experimentRunsActions from 'store/projects/experiments/experimentRuns/actions';

import ExperimentHeader from './index';

const experimentSelector = (projectId, experimentId) => (state) => {
  return Selectors.getExperiment(state, projectId, experimentId);
};

const operatorsSelector = ({ operatorsReducer }) => {
  return operatorsReducer;
};

const operatorSelector = ({ operatorReducer }) => {
  return operatorReducer;
};

const trainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentTraining.loading;
};

const deleteTrainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentTraining.deleteLoading;
};

const ExperimentHeaderContainer = () => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const loading = useIsLoading(EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST);

  const operators = useSelector(operatorsSelector);
  const operator = useSelector(operatorSelector);
  const trainingLoading = useSelector(trainingLoadingSelector);
  const deleteTrainingLoading = useSelector(deleteTrainingLoadingSelector);
  const experiment = useSelector(experimentSelector(projectId, experimentId));

  const handleEditExperimentName = (newName) => {
    dispatch(
      experimentsActions.updateExperimentRequest(projectId, experimentId, {
        name: newName,
      })
    );
  };

  const handleTrainExperiment = () => {
    dispatch(
      experimentRunsActions.createExperimentRunRequest(projectId, experimentId)
    );
  };

  const handleDeleteTrainExperiment = () => {
    dispatch(
      experimentRunsActions.deleteExperimentRunRequest(projectId, experimentId)
    );
  };

  const handleRemoveOperator = () => {
    dispatch(removeOperatorRequest(projectId, experimentId, operator));
  };

  useEffect(() => {
    if (experimentId) {
      dispatch(fetchExperimentOperatorsRequest(projectId, experimentId));
    }
  }, [dispatch, projectId, experimentId]);

  return (
    <ExperimentHeader
      title={experiment?.name}
      empty={operators.length <= 0}
      loading={loading}
      operator={operator}
      trainingLoading={trainingLoading}
      deleteTrainingLoading={deleteTrainingLoading}
      handleEditExperimentName={handleEditExperimentName}
      handleTrainExperiment={handleTrainExperiment}
      handleDeleteTrainExperiment={handleDeleteTrainExperiment}
      handleRemoveOperator={handleRemoveOperator}
    />
  );
};

export default ExperimentHeaderContainer;
