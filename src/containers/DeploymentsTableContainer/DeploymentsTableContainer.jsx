import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import DeploymentsTable from 'components/DeploymentsTable';

import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import {
  deleteDeploymentRequest,
  fetchDeploymentsRequest,
} from 'store/deployments/actions';

import { testImplantedExperimentInferenceAction } from 'store/testExperimentInference/actions';

const deploymentsSelector = ({ deploymentsReducer }) => {
  const deployments = deploymentsReducer || [];
  // filters by deployments that have an URL
  // ensures only items that are actually deployed are shown
  return deployments.filter((deployment) => !!deployment.url);
};

const isLoadingSelector = ({ uiReducer }) => {
  return uiReducer.implantedExperiments.loading;
};

const DeploymentsTableContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // first get: when component has mounted
    // show loading effect (skeleton)
    dispatch(fetchDeploymentsRequest(projectId, true));

    const polling = setInterval(
      // the following requests, there is no need to show skeleton
      () => dispatch(fetchDeploymentsRequest(projectId, false)),
      5000
    );
    return () => clearInterval(polling);
  }, [dispatch, projectId]);

  const handleDeleteDeployment = (deploymentId) => {
    dispatch(deleteDeploymentRequest(projectId, deploymentId));
  };

  const handleOpenLog = (deploymentId) => {
    dispatch(getDeployExperimentLogs(projectId, deploymentId));
  };

  const handleTestImplantedExperimentInference = (
    currentProjectId,
    deploymentId,
    file
  ) => {
    dispatch(
      testImplantedExperimentInferenceAction(
        currentProjectId,
        deploymentId,
        file
      )
    );
  };

  const deployments = useSelector(deploymentsSelector);

  const isLoading = useSelector(isLoadingSelector);

  return (
    <div className='deploymentsTableContainer'>
      <DeploymentsTable
        deployments={deployments}
        loading={isLoading}
        onDeleteDeployment={handleDeleteDeployment}
        onOpenLog={handleOpenLog}
        onTestInference={handleTestImplantedExperimentInference}
      />
    </div>
  );
};

export default DeploymentsTableContainer;
