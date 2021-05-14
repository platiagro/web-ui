import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import TabsBar from 'components/TabsBar';
import { showNewDeploymentModal } from 'store/ui/actions';
import { deselectOperator } from 'store/operator/actions';
import { clearAllMonitorings } from 'store/monitorings';
import { clearAllDeploymentLogs } from 'store/deploymentLogs/actions';
import NewDeploymentModalContainer from 'containers/NewDeploymentModalContainer';
import { clearAllDeploymentOperators } from 'store/deployments/deploymentOperators/actions';
import {
  clearAllDeployments,
  fetchDeploymentsRequest,
  duplicateDeploymentRequest,
  renameDeploymentRequest,
  deleteDeploymentRequest,
  updateDeploymentPositionRequest,
} from 'store/deployments/actions';

const loadingSelector = ({ uiReducer }) => {
  return uiReducer.deploymentsTabs.loading;
};

const deploymentsSelector = ({ deploymentsReducer }) => {
  return deploymentsReducer;
};

const getCurrentRoutePath = (projectId, deploymentId) => {
  return `/projetos/${projectId}/pre-implantacao/${deploymentId}`;
};

const DeploymentsTabsContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector(loadingSelector);
  const deployments = useSelector(deploymentsSelector);

  const isDeletingDeployment = useRef(false);

  const handleDelete = (deploymentIdToDelete) => {
    isDeletingDeployment.current = true;
    dispatch(deleteDeploymentRequest(projectId, deploymentIdToDelete));
  };

  const handleDuplicate = (deploymentIdToDuplicate, newName) => {
    dispatch(
      duplicateDeploymentRequest(projectId, deploymentIdToDuplicate, newName)
    );
  };

  const handleMoveTab = (draggedDeploymentId, hoveredDeploymentId) => {
    const draggedDeployment = deployments.find(
      ({ uuid }) => uuid === draggedDeploymentId
    );

    const hoveredDeployment = deployments.find(
      ({ uuid }) => uuid === hoveredDeploymentId
    );

    dispatch(
      updateDeploymentPositionRequest(
        projectId,
        draggedDeploymentId,
        draggedDeployment.position,
        hoveredDeployment.position
      )
    );
  };

  const handleRename = (deploymentIdToRename, newName) => {
    dispatch(
      renameDeploymentRequest(
        deployments,
        projectId,
        deploymentIdToRename,
        newName
      )
    );
  };

  const handleChangeTab = (targetDeploymentId) => {
    if (targetDeploymentId !== deploymentId) {
      const path = getCurrentRoutePath(projectId, targetDeploymentId);
      history.push(path);
      dispatch(deselectOperator());
    }
  };

  const handleShowModal = () => {
    dispatch(showNewDeploymentModal());
  };

  useEffect(() => {
    dispatch(fetchDeploymentsRequest(projectId, true));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (!deploymentId && deployments?.length) {
      const activeTab = deployments.find((element) => element.isActive);
      const [firstDeployment] = deployments;
      const firstDeploymentId = firstDeployment.uuid;
      const deploymentIdToUse = activeTab ? activeTab.uuid : firstDeploymentId;
      const path = getCurrentRoutePath(projectId, deploymentIdToUse);
      history.push(path);
    }
  }, [deploymentId, deployments, history, projectId]);

  useEffect(() => {
    if (isDeletingDeployment.current) {
      isDeletingDeployment.current = false;

      const deleteFailed = deployments.find(
        ({ uuid }) => uuid === deploymentId
      );

      if (deleteFailed) return;

      const deploymentIdToUse = deployments.length
        ? deployments[deployments.length - 1].uuid
        : '';

      if (deployments.length === 0) {
        dispatch(deselectOperator());
        dispatch(clearAllMonitorings());
        dispatch(clearAllDeploymentLogs());
        dispatch(clearAllDeploymentOperators());
      }

      const path = getCurrentRoutePath(projectId, deploymentIdToUse);
      history.push(path);
    }
  }, [deploymentId, deployments, dispatch, history, projectId]);

  useEffect(() => {
    return () => {
      dispatch(clearAllDeployments());
    };
  }, [dispatch]);

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
