// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import InferenceTestResultModal from './index';

// ACTIONS
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import { testImplantedExperimentInferenceAction } from 'store/testExperimentInference/actions';
import { fetchHideInferenceTestResultModal } from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseModal: () => dispatch(fetchHideInferenceTestResultModal()),
    handleGetDeployExperimentLogs: (deployId) =>
      dispatch(getDeployExperimentLogs(deployId)),
    handleTestImplantedExperimentInference: (deployId, file) =>
      dispatch(testImplantedExperimentInferenceAction(deployId, file)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    deployId: state.testExperimentInferenceReducer.deployId,
    file: state.testExperimentInferenceReducer.file,
    inferenceResult: state.testExperimentInferenceReducer.inferenceResult,
    loading: state.uiReducer.inferenceTestResultModal.loading,
    visible: state.uiReducer.inferenceTestResultModal.visible,
  };
};

/**
 * New Project Modal Container.
 * This component is responsible for create a logic container for new project
 * modal with redux.
 */
const InferenceTestResultModalContainer = ({
  deployId,
  file,
  inferenceResult,
  handleCloseModal,
  handleGetDeployExperimentLogs,
  handleTestImplantedExperimentInference,
  loading,
  visible,
}) => {
  const handleOpenLog = () => {
    handleGetDeployExperimentLogs(deployId);
  };

  const handleRetryTest = () => {
    handleTestImplantedExperimentInference(deployId, file);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InferenceTestResultModalContainer);
