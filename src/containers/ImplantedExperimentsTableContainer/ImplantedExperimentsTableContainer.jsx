// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import { ImplantedExperimentsTable } from 'components';

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
    handleFetchImplantedExperiments: (experiments, isToShowLoader) =>
      dispatch(fetchImplantedExperiments(experiments, isToShowLoader)),
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
    project: state.projectReducer,
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
    project,
  } = props;
  const { projectId } = useParams();

  let experiments = [];
  if (projectId === project.uuid) {
    experiments = project.experiments;
  }

  // HOOKS
  useEffect(() => {
    // fetching deployed experiments
    handleFetchImplantedExperiments(experiments, true);

    // polling deployed experiments
    const polling = setInterval(
      () => handleFetchImplantedExperiments(experiments, false),
      30000
    );
    return () => clearInterval(polling);
  }, [handleFetchImplantedExperiments, experiments]);

  const handleOpenLog = (deployId) => {
    handleGetDeployExperimentLogs(deployId);
  };

  return (
    <div className='implantedExperimentsContainer'>
      <ImplantedExperimentsTable
        handleDeleteImplantedExperiment={handleDeleteImplantedExperiment}
        handleOpenLog={handleOpenLog}
        handleTestInference={handleTestImplantedExperimentInference}
        implantedExperiments={implantedExperiments}
        loading={loading}
      />
    </div>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ImplantedExperimentsTableContainer)
);
