// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

// COMPONENTS
import ImplantedExperimentsTable from './index';
import { ImplantedExperimentsEmptyPlaceholder } from 'components/EmptyPlaceholders';

// ACTIONS
import {
  fetchImplantedExperiments,
  deleteImplantedExperiment,
} from '../../../../../store/implantedExperiments/actions';
import { testImplantedExperimentInferenceAction } from '../../../../../store/testExperimentInference/actions';
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchImplantedExperiments: () =>
      dispatch(fetchImplantedExperiments()),
    handleDeleteImplantedExperiment: (implantedExperimentUuid) =>
      dispatch(deleteImplantedExperiment(implantedExperimentUuid)),
    handleTestImplantedExperimentInference: (implantedExperimentUuid, file) =>
      dispatch(
        testImplantedExperimentInferenceAction(implantedExperimentUuid, file)
      ),
    handleGetDeployExperimentLogs: (deployId) =>
      dispatch(getDeployExperimentLogs(deployId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    implantedExperiments: state.implantedExperimentsReducer,
    loading: state.uiReducer.implantedExperiments.loading,
  };
};

/**
 * Implanted Experiments Table Container.
 * This component is responsible for create a logic container for implanted
 * experiments table with redux.
 */
const ImplantedExperimentsTableContainer = ({
  handleFetchImplantedExperiments,
  handleDeleteImplantedExperiment,
  handleGetDeployExperimentLogs,
  handleTestImplantedExperimentInference,
  implantedExperiments,
  loading,
  location,
}) => {
  // CONSTANTS
  const params = queryString.parse(location.search);
  const selectedExperiment = params['experiment'];

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching deployed experiments
    handleFetchImplantedExperiments();

    // polling deployed experiments
    const polling = setInterval(() => handleFetchImplantedExperiments(), 30000);

    return () => clearInterval(polling);
  }, [handleFetchImplantedExperiments]);

  const handleOpenLog = (deployId) => {
    handleGetDeployExperimentLogs(deployId);
  };

  // RENDER
  return loading ||
    (implantedExperiments && implantedExperiments.length > 0) ? (
    <div className='implantedExperimentsContainer'>
      <ImplantedExperimentsTable
        handleDeleteImplantedExperiment={handleDeleteImplantedExperiment}
        handleOpenLog={handleOpenLog}
        handleTestInference={handleTestImplantedExperimentInference}
        implantedExperiments={implantedExperiments}
        loading={loading}
        selectedExperiment={selectedExperiment}
      />
    </div>
  ) : (
    <ImplantedExperimentsEmptyPlaceholder />
  );
};

// EXPORT
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ImplantedExperimentsTableContainer)
);
