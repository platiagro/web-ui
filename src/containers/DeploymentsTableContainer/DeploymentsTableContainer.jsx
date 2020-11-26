// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import DeploymentsTable from 'components/Content/ProjectDetailsContent/DeploymentsTable';

// ACTIONS
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import {
  fetchDeployedExperiments,
  deleteDeployedExperiment,
} from 'store/deployments/actions';
import { testImplantedExperimentInferenceAction } from 'store/testExperimentInference/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteDeployedExperiment: (projectId, deployId) =>
      dispatch(deleteDeployedExperiment(projectId, deployId)),
    handleFetchDeployedExperiments: (projectId, experiments, isToShowLoader) =>
      dispatch(
        fetchDeployedExperiments(projectId, experiments, isToShowLoader)
      ),
    handleGetDeployExperimentLogs: (projectId, deployId) =>
      dispatch(getDeployExperimentLogs(projectId, deployId)),
    handleTestImplantedExperimentInference: (url, file) =>
      dispatch(testImplantedExperimentInferenceAction(url, file)),
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
    handleFetchDeployedExperiments(projectId, experiments, true);

    // polling deployed experiments
    const polling = setInterval(
      () => handleFetchDeployedExperiments(projectId, experiments, false),
      30000
    );
    return () => clearInterval(polling);
  }, [experiments, handleFetchDeployedExperiments, projectId]);

  const handleDeleteDeployment = (deployId) => {
    handleDeleteDeployedExperiment(projectId, deployId);
  };

  const handleOpenLog = (deployId) => {
    handleGetDeployExperimentLogs(projectId, deployId);
  };

  return (
    <div className='deploymentsTableContainer'>
      <DeploymentsTable
        deployments={deployments}
        loading={loading}
        onDeleteDeployment={handleDeleteDeployment}
        onOpenLog={handleOpenLog}
        onTestInference={handleTestImplantedExperimentInference}
      />
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeploymentsTableContainer)
);
