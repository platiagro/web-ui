// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import InferenceTestResultModal from './index';

// ACTIONS
import { hideInferenceTestResultModal } from '../../../../store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleCloseModal: () => dispatch(hideInferenceTestResultModal()),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    experimentInference: state.testExperimentInferenceReducer,
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
  experimentInference,
  handleCloseModal,
  loading,
  visible,
}) => (
  <InferenceTestResultModal
    closeModal={handleCloseModal}
    experimentInference={experimentInference}
    isLoading={loading}
    visible={visible}
  />
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InferenceTestResultModalContainer);
