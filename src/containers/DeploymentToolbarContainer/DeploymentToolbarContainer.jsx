// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

// COMPONENTS
import SaveTemplateContainer from 'containers/SaveTemplateContainer';

// ACTIONS
import { fetchOperatorsRequest } from 'store/operators/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchOperators: (projectId, experimentId) =>
      dispatch(fetchOperatorsRequest(projectId + experimentId)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    operators: state.operatorsReducer,
    loading: state.uiReducer.experimentName.loading
  }
}

const DeploymentToolbarContainer = (props) => {
  const {
    loading,
    handleFetchOperators,
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

  return (
    <div className='buttons-config'>
      <div>
        {/** FIXME: missing toolbar config */}
      </div>
      <div>
        <SaveTemplateContainer disabled={loading || empty} />
        {/** FIXME: missing run deployment button */}
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