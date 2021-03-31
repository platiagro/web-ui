// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Modal } from 'antd';

// COMPONENTS
import { Skeleton } from 'uiComponents';
import InferenceTestResultModalContent from './InferenceTestResultModalContent';

const InferenceTestResultModal = ({
  closeModal,
  experimentInference,
  getDeployExperimentLogs,
  retryTest,
  isLoading,
  visible,
}) => {
  return (
    <Modal
      title={<strong>Visualizar resultados</strong>}
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      cancelButtonProps={{ style: { display: 'none' }, disabled: true }}
      width='70vw'
    >
      {isLoading ? (
        <Skeleton paragraphConfig={{ rows: 10, width: '100%' }} />
      ) : (
        <InferenceTestResultModalContent
          experimentInference={experimentInference}
          getDeployExperimentLogs={getDeployExperimentLogs}
          retryTest={retryTest}
        />
      )}
    </Modal>
  );
};

// PROP TYPES
InferenceTestResultModal.propTypes = {
  /** close modal handler */
  closeModal: PropTypes.func.isRequired,
  /** experiment inference results*/
  experimentInference: PropTypes.object,
  /** get deploy experiment logs handler */
  getDeployExperimentLogs: PropTypes.func.isRequired,
  /** results is loading */
  isLoading: PropTypes.bool.isRequired,
  /** retry test handler */
  retryTest: PropTypes.func.isRequired,
  /** modal is visible */
  visible: PropTypes.bool.isRequired,
};

// EXPORT
export default InferenceTestResultModal;
