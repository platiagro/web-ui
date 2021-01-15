// CORE LIBS
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import DeploymentsTable from 'components/Content/ProjectDetailsContent/DeploymentsTable';
import deploymentApi from 'services/DeploymentsApi';

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
  const [deploymentsRuns, setDeploymentsRuns] = useState([]);

  useEffect(() => {
    // first get: when component has mounted
    handleFetchDeploymentsRequest(projectId);

    const polling = setInterval(
      () => handleFetchDeploymentsRequest(projectId),
      5000
    );
    return () => clearInterval(polling);
  }, [projectId, handleFetchDeploymentsRequest]);

  useEffect(() => {
    const deployments_ = deployments.map((deployment) => {
      return deploymentApi.getDeployment(projectId, deployment.uuid);
    });

    Promise.all(deployments_)
    .then((respose) => {
      const runs = respose.map((deployment) => {
        // get only the properties that matter to the deployment runs table
        const {
          experimentId,
          createdAt,
          status,
          runId,
          uuid,
          name,
          url
        } = deployment.data;
        return { createdAt, uuid, experimentId, name, runId, status, url };
      });

      setDeploymentsRuns(runs);
    })
    .catch(() => {});
  }, [deployments, projectId]);

  const deleteDeployment = (deployId) => {
    handleDeleteDeployment(projectId, deployId);
  };

  const handleOpenLog = (deployId) => {
    handleGetDeployExperimentLogs(projectId, deployId);
  };

  return (
    <div className='deploymentsTableContainer'>
      <DeploymentsTable
        deployments={deploymentsRuns}
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
