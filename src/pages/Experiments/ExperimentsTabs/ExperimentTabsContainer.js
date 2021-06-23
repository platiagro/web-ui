import React, { useEffect, useRef } from 'react';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  Selectors,
  EXPERIMENTS_TYPES,
  Actions as experimentsActions,
} from 'store/projects/experiments';
import { useIsLoading } from 'hooks';
import { hideLogsPanel } from 'store/ui/actions';
import { deselectOperator } from 'store/operator';
import { OPERATORS_TYPES } from 'store/operators';
import { clearAllExperimentLogs } from 'store/experimentLogs/actions';
import { Actions as projectsActions, PROJECTS_TYPES } from 'store/projects';

import ExperimentsTabs from './index';

const { getExperiments } = Selectors;

const experimentsSelector = (projectId) => (state) => {
  return getExperiments(state, projectId);
};

const getCurrentRoutePath = (projectId, experimentId) => {
  return `/projetos/${projectId}/experimentos/${experimentId}`;
};

const ExperimentTabsContainer = () => {
  const { projectId, experimentId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const isDeletingExperiment = useRef(false);

  const experiments = useSelector(experimentsSelector(projectId));

  const experimentDetailsLoading = useIsLoading(
    EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST,
    EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST,
    EXPERIMENTS_TYPES.DELETE_EXPERIMENT_REQUEST,
    EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_REQUEST,
    PROJECTS_TYPES.FETCH_PROJECT_REQUEST
  );

  const experimentOperatorsLoading = useIsLoading(
    OPERATORS_TYPES.FETCH_OPERATORS_REQUEST
  );

  const deleteHandler = (deleteExperimentId) => {
    isDeletingExperiment.current = true;
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
      history.push(getCurrentRoutePath(projectId, targetId));
      dispatch(clearAllExperimentLogs());
      dispatch(deselectOperator());
    }
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
    dispatch(projectsActions.fetchProjectRequest(projectId, history));
  }, [projectId, dispatch, history]);

  // Redirect to the active experiment or to the first experiment
  // if the user deletes the active experiment
  useEffect(() => {
    if (experiments.length > 0 && !experimentId) {
      const activeTab = experiments.find((element) => element.isActive);
      const [firstExperiment] = experiments;
      const { uuid } = activeTab || firstExperiment;
      const path = getCurrentRoutePath(projectId, uuid);
      history.push(path);
    }
  }, [experiments, history, projectId, experimentId]);

  useEffect(() => {
    if (isDeletingExperiment.current) {
      isDeletingExperiment.current = false;

      // If the experiment can be found in the array the deletion failed
      const deleteFailed = experiments.find(
        ({ uuid }) => uuid === experimentId
      );

      if (deleteFailed) return;

      const experimentIdToUse = experiments.length
        ? experiments[experiments.length - 1].uuid
        : '';

      if (experiments.length === 0) {
        dispatch(hideLogsPanel());
        dispatch(deselectOperator());
        dispatch(clearAllExperimentLogs());
      }

      const path = getCurrentRoutePath(projectId, experimentIdToUse);
      history.push(path);
    }
  }, [experimentId, experiments, dispatch, history, projectId]);

  useEffect(() => {
    // Destroy operator status notifications when change experiment
    notification.destroy();
  }, [experimentId]);

  return (
    <ExperimentsTabs
      loading={experimentDetailsLoading || experimentOperatorsLoading}
      activeExperiment={experimentId}
      experiments={experiments}
      deleteHandler={deleteHandler}
      renameHandler={renameHandler}
      handleChange={handleChangeTab}
      handleMoveTab={handleOrganizeTabs}
      duplicateHandler={duplicateHandler}
    />
  );
};

export default ExperimentTabsContainer;
