import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import TabsBar from 'components/TabsBar';
import { deselectOperator } from 'store/operator';
import { clearAllMonitorings } from 'store/monitorings';
import { showNewDeploymentModal } from 'store/ui/actions';
import { useFirstRenderEffect, useIsLoading } from 'hooks';
import { clearAllDeploymentOperators, OPERATORS_TYPES } from 'store/operators';
import { clearAllDeploymentLogs } from 'store/deploymentLogs/actions';
import NewDeploymentModalContainer from 'containers/NewDeploymentModalContainer';
import {
  DEPLOYMENTS_TYPES,
  clearAllDeployments,
  getSortedDeployments,
  fetchDeploymentsRequest,
  renameDeploymentRequest,
  deleteDeploymentRequest,
  duplicateDeploymentRequest,
  updateDeploymentPositionRequest,
} from 'store/deployments';

const getCurrentRoutePath = (projectId, deploymentId) => {
  return `/projetos/${projectId}/pre-implantacao/${deploymentId}`;
};

const DeploymentsTabsContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const isDeletingDeployment = useRef(false);

  const deployments = useSelector(getSortedDeployments);

  const isLoading = useIsLoading(
    OPERATORS_TYPES.FETCH_OPERATORS_REQUEST,
    DEPLOYMENTS_TYPES.DELETE_DEPLOYMENT_REQUEST,
    DEPLOYMENTS_TYPES.RENAME_DEPLOYMENT_REQUEST
  );

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

  useFirstRenderEffect(() => {
    const successCallback = (currentDeployments) => {
      if (!deploymentId) return;

      const currentDeployment = currentDeployments?.find(
        ({ uuid }) => uuid === deploymentId
      );

      if (!currentDeployment) {
        history.push('/erro-404');
      }
    };

    dispatch(fetchDeploymentsRequest(projectId, true, successCallback));
  });

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
      dispatch(deselectOperator());
      dispatch(clearAllMonitorings());
      dispatch(clearAllDeploymentOperators());
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
