// CORE LIBS
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import DeploymentsTable from 'components/Content/ProjectDetailsContent/DeploymentsTable';
import deploymentsRunsApi from 'services/DeploymentRunsApi';

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
    handleTestImplantedExperimentInference: (deployId, file) =>
      dispatch(testImplantedExperimentInferenceAction(deployId, file)),
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
    handleFetchDeploymentsRuns,
    loading,
    deployments
  } = props;
  const { projectId } = useParams();
  const [deploymentsRuns, setDeploymentsRuns] = useState([]);

  useEffect(() => {
    handleFetchDeploymentsRequest(projectId);
  }, [handleFetchDeploymentsRequest, projectId]);

  useEffect(() => {
    const deploymentRunsList = (deployments) => {
      const deploymentRuns = deployments.map((deployment) => {
        return deploymentsRunsApi.fetchDeploymentRun(
          projectId,
          deployment.uuid,
          'latest'
        );
      });

      Promise.all(deploymentRuns)
      .then((respose) => {
        const runs = respose.map((deployment) => {
          return deployment.data;
        })

        setDeploymentsRuns(runs);
      })
      .catch(() => {});
    };

    const polling = setInterval(
      () => deploymentRunsList(deployments),
      5000
    );
    return () => clearInterval(polling);
  }, [deployments, handleFetchDeploymentsRuns, projectId]);

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
