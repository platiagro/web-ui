import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ExperimentHeader from './index';

import {
  Actions as experimentsActions,
  EXPERIMENTS_TYPES,
  Selectors,
} from 'store/projects/experiments';
import { fetchOperatorsRequest } from 'store/operators';
import { removeOperatorRequest } from 'store/operator';
import experimentRunsActions from 'store/projects/experiments/experimentRuns/actions';
import { useIsLoading } from 'hooks';

const { getExperiment } = Selectors;

/**
 * Experiment Header Container.
 *
 * This component is responsible for create a logic container for experiment
 * header with redux.
 */
const ExperimentHeaderContainer = () => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const loading = useIsLoading(EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST);

  // TODO: Criar seletor com reselect
  /* eslint-disable-next-line */
  const experiment = useSelector((state) =>
    getExperiment(state, projectId, experimentId)
  );

  // TODO: Criar seletores
  /* eslint-disable */
  const operators = useSelector((state) => state.operatorsReducer);
  const operator = useSelector((state) => state.operatorReducer);
  const trainingLoading = useSelector(
    (state) => state.uiReducer.experimentTraining.loading
  );
  const deleteTrainingLoading = useSelector(
    (state) => state.uiReducer.experimentTraining.deleteLoading
  );
  /* eslint-enable */

  const editExperimentNameHandler = (newName) =>
    dispatch(
      experimentsActions.updateExperimentRequest(projectId, experimentId, {
        name: newName,
      })
    );
  const trainExperimentHandler = () =>
    dispatch(
      experimentRunsActions.createExperimentRunRequest(projectId, experimentId)
    );
  const deleteTrainExperimentHandler = () =>
    dispatch(
      experimentRunsActions.deleteExperimentRunRequest(projectId, experimentId)
    );
  const removeOperatorHandler = () =>
    dispatch(removeOperatorRequest(projectId, experimentId, operator));

  useEffect(() => {
    if (experimentId) {
      dispatch(fetchOperatorsRequest(projectId, experimentId));
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
      handleEditExperimentName={editExperimentNameHandler}
      handleTrainExperiment={trainExperimentHandler}
      handleDeleteTrainExperiment={deleteTrainExperimentHandler}
      handleRemoveOperator={removeOperatorHandler}
    />
  );
};

export default ExperimentHeaderContainer;
