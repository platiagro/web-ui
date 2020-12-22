// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import { RunDeploymentButton } from 'components/Buttons';
import SaveTemplateContainer from 'containers/SaveTemplateContainer';

// ACTIONS
import { fetchOperatorsRequest } from 'store/operators/actions';
import deploymentRunsActions from 'store/deployments/deploymentRuns/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchOperators: (projectId, deploymentId) =>
      dispatch(fetchOperatorsRequest(projectId + deploymentId)),
    handleRunDeployment: (projectId, deploymentId) =>
      dispatch(
        deploymentRunsActions.createDeploymentRunRequest(projectId, deploymentId, routerProps)
      ),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operators: state.operatorsReducer,
    loading: state.uiReducer.experimentName.loading
  }
}

/**
 * Deployment Toolbar Container.
 * This component is responsible for create a logic container
 * for deployment toolbar.
 *
 * @param {*} props Container props
 * 
 * @returns {DeploymentToolbarContainer} Container
 */
const DeploymentToolbarContainer = (props) => {
  const {
    loading,
    handleFetchOperators,
    handleRunDeployment,
    operators,
  } = props;
  
  const empty = operators.length <= 0;

  const { projectId, deploymentId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    if (deploymentId) {
      handleFetchOperators(projectId, deploymentId);
    }
  }, [projectId, deploymentId, handleFetchOperators]);

  // HANDLERS
  const runDeploymentHandler = () =>
    handleRunDeployment(projectId, deploymentId);

  return (
    <div className='buttons-config'>
      <div>
        {/** FIXME: missing toolbar config */}
      </div>
      <div>
        <SaveTemplateContainer className='deployment-buttons' disabled={loading || empty} />
        <RunDeploymentButton className='deployment-buttons' onClick={runDeploymentHandler} disabled={loading || empty}/>
      </div>
    </div>
  )
};

// EXPORT
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DeploymentToolbarContainer)
);