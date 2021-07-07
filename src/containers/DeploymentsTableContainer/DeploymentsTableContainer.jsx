import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DeploymentsTable from 'components/DeploymentsTable';
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import {
  deleteDeploymentRequest,
  fetchDeploymentsRequest,
} from 'store/deployments/actions';
import { useIsLoading } from 'hooks';
import DEPLOYMENTS_TYPES from 'store/deployments/actionTypes';

const deploymentsSelector = ({ deploymentsReducer }) => {
  const deployments = deploymentsReducer || [];
  // filters by deployments that have an URL
  // ensures only items that are actually deployed are shown
  return deployments.filter((deployment) => !!deployment.url);
};

const DeploymentsTableContainer = ({ handleShowMonitoringDrawer }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const deployments = useSelector(deploymentsSelector);

  const isLoading = useIsLoading(DEPLOYMENTS_TYPES.FETCH_DEPLOYMENTS_REQUEST);

  const handleDeleteDeployment = (deploymentId) => {
    dispatch(deleteDeploymentRequest(projectId, deploymentId));
  };

  const handleOpenLog = (deploymentId) => {
    dispatch(getDeployExperimentLogs(projectId, deploymentId));
  };

  useLayoutEffect(() => {
    dispatch(fetchDeploymentsRequest(projectId, true));

    const polling = setInterval(
      () => dispatch(fetchDeploymentsRequest(projectId, false)),
      5000
    );

    return () => clearInterval(polling);
  }, [dispatch, projectId]);

  return (
    <DeploymentsTable
      loading={isLoading}
      deployments={deployments}
      onOpenLog={handleOpenLog}
      onDeleteDeployment={handleDeleteDeployment}
      handleShowMonitoringDrawer={handleShowMonitoringDrawer}
    />
  );
};

DeploymentsTableContainer.propTypes = {
  handleShowMonitoringDrawer: PropTypes.func.isRequired,
};

export default DeploymentsTableContainer;
