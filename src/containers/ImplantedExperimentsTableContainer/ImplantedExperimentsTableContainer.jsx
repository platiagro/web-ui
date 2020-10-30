// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

// COMPONENTS
import { ImplantedExperimentsTable } from 'components';
import { ImplantedExperimentsEmptyPlaceholder } from 'components/EmptyPlaceholders';

// ACTIONS
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import {
  fetchImplantedExperiments,
  deleteImplantedExperiment,
} from 'store/implantedExperiments/actions';
import { testImplantedExperimentInferenceAction } from 'store/testExperimentInference/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteImplantedExperiment: (implantedExperimentUuid) =>
      dispatch(deleteImplantedExperiment(implantedExperimentUuid)),
    handleFetchImplantedExperiments: (isToShowLoader) =>
      dispatch(fetchImplantedExperiments(isToShowLoader)),
    handleGetDeployExperimentLogs: (deployId) =>
      dispatch(getDeployExperimentLogs(deployId)),
    handleTestImplantedExperimentInference: (implantedExperimentUuid, file) =>
      dispatch(
        testImplantedExperimentInferenceAction(implantedExperimentUuid, file)
      ),
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
 * Container to display implanted experiments table.
 * @param {object} props Container props
 * @returns {ImplantedExperimentsTableContainer} Container
 */
const ImplantedExperimentsTableContainer = (props) => {
  const {
    handleDeleteImplantedExperiment,
    handleFetchImplantedExperiments,
    handleGetDeployExperimentLogs,
    handleTestImplantedExperimentInference,
    implantedExperiments,
    loading,
    location,
  } = props;
  const params = queryString.parse(location.search);
  const selectedExperiment = params['experiment'];

  // HOOKS
  useEffect(() => {
    // fetching deployed experiments
    handleFetchImplantedExperiments(true);

    // polling deployed experiments
    const polling = setInterval(
      () => handleFetchImplantedExperiments(false),
      30000
    );
    return () => clearInterval(polling);
  }, [handleFetchImplantedExperiments]);

  const handleOpenLog = (deployId) => {
    handleGetDeployExperimentLogs(deployId);
  };

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ImplantedExperimentsTableContainer)
);
