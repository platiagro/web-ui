import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useIsLoading } from 'hooks';

import ExperimentsTabs from './index';

import {
  Actions as experimentsActions,
  EXPERIMENTS_TYPES,
  Selectors,
} from 'store/projects/experiments';

import { Actions as projectsActions, PROJECTS_TYPES } from 'store/projects';

import { deselectOperator } from 'store/operator/actions';

const { getExperiments } = Selectors;

/**
 * Experiment Tabs Container.
 *
 * This component is responsible for create a logic container for experiment tabs
 * with redux.
 */
const ExperimentTabsContainer = () => {
  const history = useHistory();
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();

  const experimentDetailsLoading = useIsLoading(
    EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST,
    EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST,
    EXPERIMENTS_TYPES.DELETE_EXPERIMENT_REQUEST,
    EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_REQUEST,
    PROJECTS_TYPES.FETCH_PROJECT_REQUEST
  );

  // TODO: Criar seletor com reselect
  /* eslint-disable-next-line */
  const experiments = useSelector((state) => getExperiments(state, projectId));
  // TODO: Criar seletor
  /* eslint-disable-next-line */
  const experimentOperatorsLoading = useSelector(
    (state) => state.uiReducer.experimentOperators.loading
  );

  const deleteHandler = (deleteExperimentId) => {
    dispatch(
      experimentsActions.deleteExperimentRequest(
        projectId,
        deleteExperimentId,
        history
      )
    );
  };

  const renameHandler = (renameExperimentId, newName) => {
    dispatch(
      experimentsActions.updateExperimentRequest(
        projectId,
        renameExperimentId,
        {
          name: newName,
        }
      )
    );
  };
  const duplicateHandler = (copyExperimentId, newName) => {
    dispatch(
      experimentsActions.createExperimentRequest(
        projectId,
        { name: newName, copyFrom: copyExperimentId },
        history
      )
    );
  };
  const handleChangeTab = (targetId) => {
    if (targetId !== experimentId) {
      dispatch(experimentsActions.activeExperiment(projectId, targetId));

      history.push(`/projetos/${projectId}/experimentos/${targetId}`);
    }

    dispatch(deselectOperator());
  };
  const handleOrganizeTabs = (dragExperimentId, hoverExperimentId) => {
    const hoverExperiment = experiments.find(
      (experiment) => experiment.uuid === hoverExperimentId
    );

    const newPosition = hoverExperiment.position;

    dispatch(
      experimentsActions.organizeExperimentsRequest(
        projectId,
        dragExperimentId,
        hoverExperimentId,
        newPosition
      )
    );
  };

  useEffect(() => {
    dispatch(projectsActions.fetchProjectRequest(projectId));
  }, [projectId, dispatch]);

  // listen experiments to redirect to active
  useEffect(() => {
    // if has experiments and experiment id is deleted
    if (experiments.length > 0 && !experimentId) {
      // active tab is finded into experiments
      const activeTab = experiments.find((element) => element.isActive);
      // if active tab exists, then url will change
      if (activeTab) {
        history.push(`/projetos/${projectId}/experimentos/${activeTab.uuid}`);
      }
    }
  }, [experiments, history, projectId, experimentId]);

  return (
    <ExperimentsTabs
      activeExperiment={experimentId}
      experiments={experiments}
      handleChange={handleChangeTab}
      handleMoveTab={handleOrganizeTabs}
      loading={experimentDetailsLoading || experimentOperatorsLoading}
      deleteHandler={deleteHandler}
      renameHandler={renameHandler}
      duplicateHandler={duplicateHandler}
    />
  );
};

export default ExperimentTabsContainer;
