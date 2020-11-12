// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import DeploymentsTable from 'components/Content/ProjectDetailsContent/DeploymentsTable';

// ACTIONS
import { fetchDeployExperimentLogs } from 'store/deploymentLogs/actions';
import {
  fetchDeployedExperiments,
  fetchDeleteDeployedExperiment,
} from 'store/deployments/actions';
import { testImplantedExperimentInferenceAction } from 'store/testExperimentInference/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteDeployedExperiment: (implantedExperimentUuid) =>
      dispatch(fetchDeleteDeployedExperiment(implantedExperimentUuid)),
    handleFetchDeployedExperiments: (experiments, isToShowLoader) =>
      dispatch(fetchDeployedExperiments(experiments, isToShowLoader)),
    handleGetDeployExperimentLogs: (deployId) =>
      dispatch(fetchDeployExperimentLogs(deployId)),
    handleTestImplantedExperimentInference: (implantedExperimentUuid, file) =>
      dispatch(
        testImplantedExperimentInferenceAction(implantedExperimentUuid, file)
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    deployments: state.deploymentsReducer,
    loading: state.uiReducer.implantedExperiments.loading,
    project: state.projectReducer,
  };
};

/**
 * Container to display deployments table.
 *
 * @param {object} props Container props
 * @returns {DeploymentsTableContainer} Container
 */
const DeploymentsTableContainer = (props) => {
  const {
    deployments,
    handleDeleteDeployedExperiment,
    handleFetchDeployedExperiments,
    handleGetDeployExperimentLogs,
    handleTestImplantedExperimentInference,
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
    handleFetchDeployedExperiments(experiments, true);

    // polling deployed experiments
    const polling = setInterval(
      () => handleFetchDeployedExperiments(experiments, false),
      30000
    );
    return () => clearInterval(polling);
  }, [handleFetchDeployedExperiments, experiments]);

  const handleOpenLog = (deployId) => {
    handleGetDeployExperimentLogs(deployId);
  };

  return (
    <div className='deploymentsTableContainer'>
      <DeploymentsTable
        deployments={deployments}
        loading={loading}
        onDeleteDeployment={handleDeleteDeployedExperiment}
        onOpenLog={handleOpenLog}
        onTestInference={handleTestImplantedExperimentInference}
      />
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeploymentsTableContainer)
);
