// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// COMPONENTS
import ExperimentsTabs from './index';

// ACTIONS
import {
  fetchExperimentsRequest,
  organizeExperiments,
} from '../../../../../store/experiments/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchExperiments: (projectId) =>
      dispatch(fetchExperimentsRequest(projectId)),
    handleOrganizeExperiments: (experimentKey, hoverKey) =>
      dispatch(organizeExperiments(experimentKey, hoverKey)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return { experiments: state.experiments };
};

/**
 * Experiment Tabs Container.
 * This component is responsible for create a logic container for experiment tabs
 * with redux.
 */
const ExperimentTabsContainer = ({
  experiments,
  handleFetchExperiments,
  handleOrganizeExperiments,
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
  // go back
  const handleChangeTab = (targetId) =>
    history.push(`/projetos/${projectId}/${targetId}`);

  // RENDER
  return (
    <ExperimentsTabs
      activeExperiment={experimentId}
      experiments={experiments}
      handleChange={handleChangeTab}
      handleMoveTab={handleOrganizeExperiments}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentTabsContainer);
