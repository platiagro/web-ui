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
import testImplantedExperimentInferenceAction from '../../../../../store/testExperimentInference/testImplantedExperimentInferenceAction';
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import { hideExperimentInferenceModal } from 'store/ui/actions';

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
    closeModal: () => dispatch(hideExperimentInferenceModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    implantedExperiments: state.implantedExperimentsReducer,
    loading: state.uiReducer.implantedExperiments.loading,
    experimentInference: state.testExperimentInferenceReducer,
    experimentInferenceModal: state.uiReducer.experimentInferenceModal.visible,
  };
};

// CONSTANTS
// polling time in miliseconds;
const pollingTime = 30000;

/**
 * Implanted Experiments Table Container.
 * This component is responsible for create a logic container for implanted
 * experiments table with redux.
 */
const ImplantedExperimentsTableContainer = ({
  implantedExperiments,
  handleFetchImplantedExperiments,
  handleDeleteImplantedExperiment,
  handleTestImplantedExperimentInference,
  handleShowDrawer,
  loading,
  handleGetDeployExperimentLogs,
  location,
  experimentInference,
  experimentInferenceModal,
  closeModal,
  handleHideExperimentInferenceModal,
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
    const polling = setInterval(
      () => handleFetchImplantedExperiments(),
      pollingTime
    );

    return () => clearInterval(polling);
  }, [handleFetchImplantedExperiments]);

  const handleOpenLog = (deployId) => {
    handleGetDeployExperimentLogs(deployId);
  };

  // RENDER
  return implantedExperiments &&
    (loading || implantedExperiments.length > 0) ? (
    <div className='implantedExperimentsContainer'>
      <ImplantedExperimentsTable
        implantedExperiments={implantedExperiments}
        handleTestInference={handleTestImplantedExperimentInference}
        handleDeleteImplantedExperiment={handleDeleteImplantedExperiment}
        handleOpenLog={handleOpenLog}
        loading={loading}
        selectedExperiment={selectedExperiment}
        experimentInference={experimentInference}
        experimentInferenceModal={experimentInferenceModal}
        closeModal={closeModal}
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
