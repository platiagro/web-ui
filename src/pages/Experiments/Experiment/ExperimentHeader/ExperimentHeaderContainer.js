import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, shallowEqual } from 'react-redux';

import {
  Selectors,
  EXPERIMENTS_TYPES,
  Actions as experimentsActions,
} from 'store/projects/experiments';
import { removeOperatorRequest } from 'store/operator';
import { useDeepEqualSelector, useIsLoading } from 'hooks';
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

  const operators = useDeepEqualSelector(operatorsSelector, shallowEqual);
  const operator = useDeepEqualSelector(operatorSelector, shallowEqual);

  const trainingLoading = useDeepEqualSelector(
    trainingLoadingSelector,
    shallowEqual
  );

  const deleteTrainingLoading = useDeepEqualSelector(
    deleteTrainingLoadingSelector,
    shallowEqual
  );

  const experiment = useDeepEqualSelector(
    experimentSelector(projectId, experimentId),
    shallowEqual
  );

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
