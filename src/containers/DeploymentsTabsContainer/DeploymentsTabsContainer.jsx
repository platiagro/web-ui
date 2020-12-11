// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import Tabs from 'components/Tabs';

// ACTIONS
import {
  createProjectDeployment,
  deleteProjectDeployment,
  fetchProjectDeployments,
  updateDeploymentPosition,
} from 'store/projectDeployments/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleCreateProjectDeployment: (projectId, experimentId, name) =>
      dispatch(createProjectDeployment(projectId, experimentId, name)),
    handleFetchProjectDeployments: (projectId) =>
      dispatch(fetchProjectDeployments(projectId)),
    handleDeleteProjectDeployment: (projectId, experimentId) =>
      dispatch(deleteProjectDeployment(projectId, experimentId, routerProps)),
    handleUpdateDeploymentPosition: (projectId, dragId, hoverId, newPosition) =>
      dispatch(
        updateDeploymentPosition(projectId, dragId, hoverId, newPosition)
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
 * Experiment Tabs Container.
 * This component is responsible for create a logic container for experiment tabs
 * with redux.
 *
 * @component
 * @param {object} props Component props
 * @returns {ProjectsDeploymentsContainer} React component
 */
const DeploymentsTabsContainer = (props) => {
  const {
    deployments,
    handleDeleteProjectDeployment,
    handleFetchProjectDeployments,
    handleUpdateDeploymentPosition,
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
    <Tabs
      deleteTitle={'Excluir monitoramento?'}
      modalItemLabel='Qual o nome do seu monitoramento?'
      modalInitialValue='Novo monitoramento'
      modalRuleMessage='Por favor insira um nome para o monitoramento!'
      modalTitle='Novo Monitoramento'
      handleDelete={handleDelete}
      handleMoveTab={handleMoveTab}
      loading={loading}
      tabs={deployments}
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeploymentsTabsContainer)
);
