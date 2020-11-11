// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import ExperimentsTabs from './index';

// ACTIONS
import {
  fetchExperimentsRequest,
  organizeExperimentsRequest,
  clearAllExperiments,
} from '../../../../../store/experiments/actions';
import {
  fetchExperimentActiveRequest,
  deleteExperimentRequest,
  editExperimentNameRequest,
  createExperimentRequest,
} from '../../../../../store/experiment/actions';

import { deselectOperator } from '../../../../../store/operator/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleClearAllExperiments: () => dispatch(clearAllExperiments()),
    handleFetchExperiments: (projectId) =>
      dispatch(fetchExperimentsRequest(projectId, routerProps)),
    handleFetchExperiment: (projectId, experimentId) =>
      dispatch(fetchExperimentActiveRequest(projectId, experimentId)),
    handleDeleteExperiment: (projectId, experimentId) =>
      dispatch(deleteExperimentRequest(projectId, experimentId, routerProps)),
    handleRenameExperiment: (projectId, experimentId, newName) =>
      dispatch(
        editExperimentNameRequest(projectId, experimentId, newName, routerProps)
      ),
    handleDuplicateExperiment: (projectId, experimentId, newName) =>
      dispatch(
        createExperimentRequest(
          projectId,
          newName,
          experimentId,
          true,
          routerProps
        )
      ),
    handleOrganizeExperiments: (
      projectId,
      dragExperimentId,
      hoverExperimentId,
      newPosition
    ) =>
      dispatch(
        organizeExperimentsRequest(
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
    experiments: state.experimentsReducer,
    experimentDetailsLoading: state.uiReducer.experimentsTabs.loading,
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
    experimentDetailsLoading,
    experimentOperatorsLoading,
    handleFetchExperiments,
    handleOrganizeExperiments,
    handleFetchExperiment,
    handleClearAllExperiments,
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

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching projects
    handleFetchExperiments(projectId);
  }, [handleFetchExperiments, projectId, handleClearAllExperiments]);

  useEffect(() => {
    return () => {
      // clear all experiments of redux when dismount
      handleClearAllExperiments();
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // listen experiments to redirect to active
  useEffect(() => {
    // if has experiments and experiment id is deleted
    if (experiments.length > 0 && experimentId === 'deleted') {
      // active tab is finded into experiments
      const activeTab = experiments.find((element) => element.isActive);
      // if active tab exists, then url will change
      if (activeTab) {
        history.push(`/projetos/${projectId}/${activeTab.uuid}`);
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
      handleFetchExperiment(projectId, targetId);
      // routing
      history.push(`/projetos/${projectId}/${targetId}`);
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
