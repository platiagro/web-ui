// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import DeploymentsTable from 'components/Content/ProjectDetailsContent/DeploymentsTable';

// ACTIONS
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import {
  fetchDeploymentsRequest,
  deleteDeploymentRequest
} from 'store/deployments/actions';

import { testImplantedExperimentInferenceAction } from 'store/testExperimentInference/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleDeleteDeployment: (projectId, deploymentId) =>
      dispatch(deleteDeploymentRequest(projectId, deploymentId)),
    handleFetchDeployments: (projectId, isToShowLoader) =>
      dispatch(
        fetchDeploymentsRequest(projectId, isToShowLoader)
      ),
    handleGetDeployExperimentLogs: (projectId, deployId) =>
      dispatch(getDeployExperimentLogs(projectId, deployId)),
    handleTestImplantedExperimentInference: (deployId, file) =>
      dispatch(testImplantedExperimentInferenceAction(deployId, file)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    deployments: state.deploymentsReducer,
    loading: state.uiReducer.implantedExperiments.loading,
    project: state.projectReducer,
  };
};

/**
 * Container to display deployments table.
 *
 * @param {object} props Container props
 * @returns {DeploymentsTableContainer} Container
 */
const DeploymentsTableContainer = (props) => {
  const {
    deployments,
    handleDeleteDeployment,
    handleFetchDeployments,
    handleGetDeployExperimentLogs,
    handleTestImplantedExperimentInference,
    loading,
    project,
  } = props;
  const { projectId } = useParams();

  // let experiments = [];
  // if (projectId === project.uuid) {
  //   experiments = project.experiments;
  // }

  // HOOKS
  useEffect(() => {
    // fetching deployed experiments
    handleFetchDeployments(projectId, true);

    // polling deployed experiments
    const polling = setInterval(
      () => handleFetchDeployments(projectId, false),
      30000
    );
    return () => clearInterval(polling);
  }, [handleFetchDeployments, projectId]);

  const deleteDeployment = (deployId) => {
    handleDeleteDeployment(projectId, deployId);
  };

  const handleOpenLog = (deployId) => {
    handleGetDeployExperimentLogs(projectId, deployId);
  };

  return (
    <div className='deploymentsTableContainer'>
      <DeploymentsTable
        deployments={deployments}
        loading={loading}
        onDeleteDeployment={deleteDeployment}
        onOpenLog={handleOpenLog}
        onTestInference={handleTestImplantedExperimentInference}
      />
    </div>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeploymentsTableContainer)
);
