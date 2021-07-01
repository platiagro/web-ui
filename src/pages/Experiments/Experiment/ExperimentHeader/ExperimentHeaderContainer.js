import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Selectors,
  EXPERIMENTS_TYPES,
  Actions as experimentsActions,
} from 'store/projects/experiments';
import { removeOperatorRequest } from 'store/operator';
import { useDeepEqualSelector, useIsLoading, useChangeFavicon } from 'hooks';
import { fetchExperimentOperatorsRequest } from 'store/operators';
import experimentRunsActions from 'store/projects/experiments/experimentRuns/actions';
import { experimentTrainingDataLoaded } from 'store/ui/actions';
import ExperimentHeader from './index';

const experimentSelector = (projectId, experimentId) => (state) => {
  return Selectors.getExperiment(state, projectId, experimentId);
};

const trainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentTraining.loading;
};

const operatorsSelector = ({ operatorsReducer }) => {
  return operatorsReducer;
};

const operatorSelector = ({ operatorReducer }) => {
  return operatorReducer;
};

const deleteTrainingLoadingSelector = ({ uiReducer }) => {
  return uiReducer.experimentTraining.deleteLoading;
};

const ExperimentHeaderContainer = () => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const loading = useIsLoading(EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST);

  const trainingLoading = useDeepEqualSelector(trainingLoadingSelector);
  const operators = useDeepEqualSelector(operatorsSelector);
  const operator = useDeepEqualSelector(operatorSelector);

  const deleteTrainingLoading = useDeepEqualSelector(
    deleteTrainingLoadingSelector
  );

  const experiment = useDeepEqualSelector(
    experimentSelector(projectId, experimentId)
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

  const stopTrainingLoading = useCallback(() => {
    dispatch(experimentTrainingDataLoaded());
  }, [dispatch]);

  useEffect(() => {
    if (experimentId) {
      dispatch(fetchExperimentOperatorsRequest(projectId, experimentId));
    }
  }, [dispatch, projectId, experimentId]);

  //Using useEffect as cleanup to reset loading
  useEffect(() => {
    return () => {
      stopTrainingLoading();
    };
  }, [stopTrainingLoading]);

  useChangeFavicon(trainingLoading);

  return (
    <ExperimentHeader
      loading={loading}
      operator={operator}
      title={experiment?.name}
      empty={operators.length <= 0}
      trainingLoading={trainingLoading}
      deleteTrainingLoading={deleteTrainingLoading}
      handleRemoveOperator={handleRemoveOperator}
      handleTrainExperiment={handleTrainExperiment}
      handleEditExperimentName={handleEditExperimentName}
      handleDeleteTrainExperiment={handleDeleteTrainExperiment}
    />
  );
};

export default ExperimentHeaderContainer;
