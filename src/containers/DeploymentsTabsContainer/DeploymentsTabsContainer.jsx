// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import TabsBar from 'components/TabsBar';

// ACTIONS
import {
  deleteProjectDeployment,
  fetchProjectDeployments,
  updateDeploymentPosition,
} from 'store/projectDeployments/actions';
import { deploymentsTabsShowModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchProjectDeployments: (projectId) =>
      dispatch(fetchProjectDeployments(projectId)),
    handleDeleteProjectDeployment: (projectId, experimentId) =>
      dispatch(deleteProjectDeployment(projectId, experimentId, routerProps)),
    handleUpdateDeploymentPosition: (projectId, dragId, hoverId, newPosition) =>
      dispatch(
        updateDeploymentPosition(projectId, dragId, hoverId, newPosition)
      ),
    handleShowModal: () => dispatch(deploymentsTabsShowModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    deployments: state.projectDeploymentsReducer,
    loading: state.uiReducer.deploymentsTabs.loading,
  };
};

/**
 * Deployments Tabs Container.
 * This component is responsible for create a logic container for deploymenys tabs
 * with redux.
 */
const DeploymentsTabsContainer = (props) => {
  const {
    deployments,
    handleDeleteProjectDeployment,
    handleFetchProjectDeployments,
    handleUpdateDeploymentPosition,
    handleShowModal,
    loading,
  } = props;
  const { projectId } = useParams();

  // HOOKS
  useEffect(() => {
    handleFetchProjectDeployments(projectId);
  }, [handleFetchProjectDeployments, projectId]);

  // HANDLERS
  const handleDelete = (deploymentId) => {
    handleDeleteProjectDeployment(projectId, deploymentId);
  };

  const handleMoveTab = (dragId, hoverId) => {
    const hoverDeploy = deployments.find((deploy) => deploy.uuid === hoverId);
    const newPosition = hoverDeploy.position;
    handleUpdateDeploymentPosition(projectId, dragId, hoverId, newPosition);
  };

  // RENDER
  return (
    <TabsBar
      deleteTitle={'Excluir monitoramento?'}
      loading={loading}
      onClick={handleShowModal}
      onDelete={handleDelete}
      onMoveTab={handleMoveTab}
      tabs={deployments}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeploymentsTabsContainer)
);
