// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentsTabs from './index';

// ACTIONS
import {
  fetchExperimentsRequest,
  organizeExperimentsRequest,
} from '../../../../../store/experiments/actions';
import { fetchExperimentRequest } from '../../../../../store/experiment/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchExperiments: (projectId) =>
      dispatch(fetchExperimentsRequest(projectId)),
    handleFetchExperiment: (projectId, experimentId) =>
      dispatch(fetchExperimentRequest(projectId, experimentId)),
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
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    experiments: state.experiments,
    loading: state.ui.experimentsTabs.loading,
  };
};

/**
 * Experiment Tabs Container.
 * This component is responsible for create a logic container for experiment tabs
 * with redux.
 */
const ExperimentTabsContainer = ({
  experiments,
  loading,
  handleFetchExperiments,
  handleOrganizeExperiments,
  handleFetchExperiment,
}) => {
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
  }, []);

  // HANDLERS
  // change tab
  const handleChangeTab = (targetId) => {
    // fetching experiment
    handleFetchExperiment(projectId, targetId);

    // routing
    history.push(`/projetos/${projectId}/${targetId}`);
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
      loading={loading}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentTabsContainer);
