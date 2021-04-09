import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import TabsBar from 'components/TabsBar';
import { showNewDeploymentModal } from 'store/ui/actions';
import NewDeploymentModalContainer from 'containers/NewDeploymentModalContainer';
import {
  deleteProjectDeployment,
  fetchProjectDeployments,
  updateDeploymentPosition,
} from 'store/projectDeployments/actions';
import {
  duplicateDeploymentRequest,
  renameDeploymentRequest,
} from 'store/deployments/actions';

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.deploymentsTabs.loading;
};

const deploymentsSelector = ({ projectDeploymentsReducer }) => {
  return projectDeploymentsReducer;
};

const DeploymentsTabsContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector(loadingSelector);
  const deployments = useSelector(deploymentsSelector);

  const handleDelete = (deploymentId) => {
    dispatch(deleteProjectDeployment(projectId, deploymentId));
  };

  const handleDuplicate = (deploymentId, newName) => {
    dispatch(duplicateDeploymentRequest(projectId, deploymentId, newName));
  };

  const handleMoveTab = (dragId, hoverId) => {
    const hoverDeploy = deployments.find((deploy) => deploy.uuid === hoverId);
    const newPosition = hoverDeploy.position;
    dispatch(updateDeploymentPosition(projectId, dragId, hoverId, newPosition));
  };

  const handleRename = (deploymentId, newName) => {
    dispatch(
      renameDeploymentRequest(deployments, projectId, deploymentId, newName)
    );
  };

  const handleChangeTab = (targetDeploymentId) => {
    if (targetDeploymentId !== deploymentId) {
      history.push(
        `/projetos/${projectId}/pre-implantacao/${targetDeploymentId}`
      );
    }
  };

  const handleShowModal = () => {
    dispatch(showNewDeploymentModal());
  };

  useEffect(() => {
    dispatch(fetchProjectDeployments(projectId));
  }, [dispatch, projectId]);

  return (
    <>
      <TabsBar
        activeTab={deploymentId}
        deleteTitle='Excluir Este Fluxo?'
        loading={isLoading}
        onClick={handleShowModal}
        onDelete={handleDelete}
        onMoveTab={handleMoveTab}
        onDuplicate={handleDuplicate}
        onRename={handleRename}
        onChange={handleChangeTab}
        tabs={deployments}
      />

      <NewDeploymentModalContainer />
    </>
  );
};

export default DeploymentsTabsContainer;
