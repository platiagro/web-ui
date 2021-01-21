// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import TabsBar from 'components/TabsBar';

// CONTAINERS
import NewDeploymentModalContainer from 'containers/NewDeploymentModalContainer';

// ACTIONS
import {
  deleteProjectDeployment,
  fetchProjectDeployments,
  updateDeploymentPosition,
} from 'store/projectDeployments/actions';
import { deploymentsTabsShowModal } from 'store/ui/actions';
import { renameDeploymentRequest } from 'store/deployments/actions';

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
    handleRenameDeployment: (deployments, projectId, deploymentId, newName) =>
      dispatch(
        renameDeploymentRequest(deployments, projectId, deploymentId, newName)
      ),
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
    handleRenameDeployment,
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

  const handleRename = (deploymentId, newName) =>
    handleRenameDeployment(deployments, projectId, deploymentId, newName);

  // RENDER
  return (
    <>
      <TabsBar
        deleteTitle={'Excluir monitoramento?'}
        loading={loading}
        onClick={handleShowModal}
        onDelete={handleDelete}
        onMoveTab={handleMoveTab}
        onRename={handleRename}
        tabs={deployments}
      />
      <NewDeploymentModalContainer />
    </>
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeploymentsTabsContainer)
);
