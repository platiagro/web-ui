// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';
import { useIsLoading } from 'hooks';

// COMPONENTS
import ExperimentsTabs from './index';

// ACTIONS
import {
  Actions as experimentsActions,
  EXPERIMENTS_TYPES,
  Selectors,
} from 'store/projects/experiments';

import { Actions as projectsActions, PROJECTS_TYPES } from 'store/projects';

import { deselectOperator } from 'store/operator/actions';

const { getExperiments } = Selectors;

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchProject: (projectId) =>
      dispatch(projectsActions.fetchProjectRequest(projectId)),
    handleActiveExperiment: (projectId, experimentId) =>
      dispatch(experimentsActions.activeExperiment(projectId, experimentId)),
    handleDeleteExperiment: (projectId, experimentId) =>
      dispatch(
        experimentsActions.deleteExperimentRequest(
          projectId,
          experimentId,
          routerProps.history
        )
      ),
    handleRenameExperiment: (projectId, experimentId, newName) =>
      dispatch(
        experimentsActions.updateExperimentRequest(projectId, experimentId, {
          name: newName,
        })
      ),
    handleDuplicateExperiment: (projectId, experimentId, newName) =>
      dispatch(
        experimentsActions.createExperimentRequest(
          projectId,
          { name: newName, copyFrom: experimentId },
          routerProps.history
        )
      ),
    handleOrganizeExperiments: (
      projectId,
      dragExperimentId,
      hoverExperimentId,
      newPosition
    ) =>
      dispatch(
        experimentsActions.organizeExperimentsRequest(
          projectId,
          dragExperimentId,
          hoverExperimentId,
          newPosition
        )
      ),
    handleDeselectOperator: () => dispatch(deselectOperator()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    experiments: getExperiments(state),
    experimentOperatorsLoading: state.uiReducer.experimentOperators.loading,
  };
};

/**
 * Experiment Tabs Container.
 * This component is responsible for create a logic container for experiment tabs
 * with redux.
 *
 * @component
 * @param {object} props Component props
 * @returns {ExperimentTabsContainer} React component
 */
const ExperimentTabsContainer = (props) => {
  // destructuring props
  const {
    experiments,
    experimentOperatorsLoading,
    handleFetchProject,
    handleOrganizeExperiments,
    handleActiveExperiment,
    handleDeleteExperiment,
    handleRenameExperiment,
    handleDuplicateExperiment,
    handleDeselectOperator,
  } = props;

  // CONSTANTS
  // getting history
  const history = useHistory();
  // getting project uuid
  const { projectId, experimentId } = useParams();

  const experimentDetailsLoading = useIsLoading(
    EXPERIMENTS_TYPES.UPDATE_EXPERIMENT_REQUEST,
    EXPERIMENTS_TYPES.CREATE_EXPERIMENT_REQUEST,
    EXPERIMENTS_TYPES.DELETE_EXPERIMENT_REQUEST,
    EXPERIMENTS_TYPES.ORGANIZE_EXPERIMENTS_REQUEST,
    PROJECTS_TYPES.FETCH_PROJECT_REQUEST
  );

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetch project
    handleFetchProject(projectId);
  }, [handleFetchProject, projectId]);

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

  // HANDLERS
  const deleteHandler = (deleteExperimentId) => {
    handleDeleteExperiment(projectId, deleteExperimentId);
  };

  const renameHandler = (renameExperimentId, newName) => {
    handleRenameExperiment(projectId, renameExperimentId, newName);
  };
  const duplicateHandler = (copyExperimentId, newName) => {
    handleDuplicateExperiment(projectId, copyExperimentId, newName);
  };
  // change tab
  const handleChangeTab = (targetId) => {
    // fetching experiment
    if (targetId !== experimentId) {
      handleActiveExperiment(projectId, targetId);
      // routing
      history.push(`/projetos/${projectId}/experimentos/${targetId}`);
    }
    handleDeselectOperator();
  };
  // organizing tabs
  const handleOrganizeTabs = (dragExperimentId, hoverExperimentId) => {
    // getting hover experiment
    const hoverExperiment = experiments.find(
      (experiment) => experiment.uuid === hoverExperimentId
    );

    // getting new position
    const newPosition = hoverExperiment.position;

    handleOrganizeExperiments(
      projectId,
      dragExperimentId,
      hoverExperimentId,
      newPosition
    );
  };

  // RENDER
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

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentTabsContainer)
);
