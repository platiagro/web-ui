// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// COMPONENTS
import { InferenceTestResultModal } from 'components/Modals';

// ACTIONS
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import { testImplantedExperimentInferenceAction } from 'store/testExperimentInference/actions';
import { hideInferenceTestResultModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseModal: () => dispatch(hideInferenceTestResultModal()),
    handleGetDeployExperimentLogs: (projectId, deployId) =>
      dispatch(getDeployExperimentLogs(projectId, deployId)),
    handleTestImplantedExperimentInference: (projectId, deployId, file) =>
      dispatch(
        testImplantedExperimentInferenceAction(projectId, deployId, file)
      ),
  };
};

// STATES
const mapStateToProps = (state, ownProps) => {
  const { projectId } = ownProps.match.params;

  return {
    deployId: state.testExperimentInferenceReducer.deployId,
    file: state.testExperimentInferenceReducer.file,
    inferenceResult: state.testExperimentInferenceReducer.inferenceResult,
    loading: state.uiReducer.inferenceTestResultModal.loading,
    projectId,
    visible: state.uiReducer.inferenceTestResultModal.visible,
  };
};

/**
 * Container to display inference test result modal.
 *
 * @param {object} props Container props
 * @returns {InferenceTestResultModalContainer} Container
 */
const InferenceTestResultModalContainer = (props) => {
  const {
    deployId,
    file,
    handleCloseModal,
    handleGetDeployExperimentLogs,
    handleTestImplantedExperimentInference,
    inferenceResult,
    loading,
    projectId,
    visible,
  } = props;

  const handleOpenLog = () => {
    handleGetDeployExperimentLogs(projectId, deployId);
  };

  const handleRetryTest = () => {
    handleTestImplantedExperimentInference(projectId, deployId, file);
  };

  return (
    <InferenceTestResultModal
      closeModal={handleCloseModal}
      experimentInference={inferenceResult}
      getDeployExperimentLogs={handleOpenLog}
      isLoading={loading}
      retryTest={handleRetryTest}
      visible={visible}
    />
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InferenceTestResultModalContainer)
);
