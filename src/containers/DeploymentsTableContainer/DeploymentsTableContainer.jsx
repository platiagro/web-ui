// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import DeploymentsTable from 'components/Content/ProjectDetailsContent/DeploymentsTable';

// ACTIONS
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import { deleteDeploymentRequest, fetchDeploymentsRequest, fetchAllDeploymentsRuns } from 'store/deployments/actions';

import { testImplantedExperimentInferenceAction } from 'store/testExperimentInference/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchDeploymentsRuns: (projectId, deploymentId) =>
      dispatch(fetchAllDeploymentsRuns(projectId, deploymentId, true)),
    handleDeleteDeployment: (projectId, deploymentId) =>
      dispatch(deleteDeploymentRequest(projectId, deploymentId)),
    handleGetDeployExperimentLogs: (projectId, deployId) =>
      dispatch(getDeployExperimentLogs(projectId, deployId)),
    handleTestImplantedExperimentInference: (projectId, deployId, file) =>
      dispatch(testImplantedExperimentInferenceAction(projectId, deployId, file)),
    handleFetchDeploymentsRequest: (projectId) =>
      dispatch(fetchDeploymentsRequest(projectId, false)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    loading: state.uiReducer.implantedExperiments.loading,
    project: state.projectReducer,
    deployments: state.deploymentsReducer,
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
    handleDeleteDeployment,
    handleGetDeployExperimentLogs,
    handleTestImplantedExperimentInference,
    handleFetchDeploymentsRequest,
    loading,
    deployments
  } = props;
  const { projectId } = useParams();

  useEffect(() => {
    // first get: when component has mounted
    handleFetchDeploymentsRequest(projectId);

    const polling = setInterval(
      () => handleFetchDeploymentsRequest(projectId),
      5000
    );
    return () => clearInterval(polling);
  }, [projectId, handleFetchDeploymentsRequest]);

  const deleteDeployment = (deployId) => {
    handleDeleteDeployment(projectId, deployId);
  };

  const handleOpenLog = (deployId) => {
    handleGetDeployExperimentLogs(projectId, deployId);
  };

  return (
    <div className='deploymentsTableContainer'>
      <DeploymentsTable
        deployments={deployments}
        loading={loading}
        onDeleteDeployment={deleteDeployment}
        onOpenLog={handleOpenLog}
        onTestInference={handleTestImplantedExperimentInference}
      />
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeploymentsTableContainer)
);
