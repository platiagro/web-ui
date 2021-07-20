import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

import { Skeleton } from 'uiComponents';
import DeploymentTestResultModalContent from './DeploymentTestResultModalContent';

const DeploymentTestResultModal = ({
  testResult,
  isTestingFlow,
  isShowingModal,
  handleTryAgain,
  handleShowLogs,
  handleHideModal,
}) => {
  return (
    <Modal
      width='70vw'
      footer={null}
      visible={isShowingModal}
      onCancel={handleHideModal}
      title={<strong>Visualizar Resultados do Teste do Fluxo</strong>}
    >
      {isTestingFlow ? (
        <Skeleton paragraphConfig={{ rows: 10, width: '100%' }} />
      ) : (
        <DeploymentTestResultModalContent
          testResult={testResult}
          handleShowLogs={handleShowLogs}
          handleTryAgain={handleTryAgain}
        />
      )}
    </Modal>
  );
};

DeploymentTestResultModal.propTypes = {
  testResult: PropTypes.object,
  isTestingFlow: PropTypes.bool.isRequired,
  isShowingModal: PropTypes.bool.isRequired,
  handleTryAgain: PropTypes.func.isRequired,
  handleShowLogs: PropTypes.func.isRequired,
  handleHideModal: PropTypes.func.isRequired,
};

export default DeploymentTestResultModal;
