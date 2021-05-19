import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  getDataset,
  getTestResult,
  testDeploymentWithDataset,
} from 'store/testDeployment';
import { showLogsPanel } from 'store/ui/actions';
import { DeploymentTestResultModal } from 'components/Modals';
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';

const DeploymentTestResultModalContainer = ({
  projectId,
  deploymentId,
  isTestingFlow,
  isShowingModal,
  handleHideModal,
}) => {
  const dispatch = useDispatch();

  const dataset = useSelector(getDataset);
  const testResult = useSelector(getTestResult);

  const handleShowLogs = () => {
    dispatch(getDeployExperimentLogs(projectId, deploymentId, false));
    dispatch(showLogsPanel());
    if (handleHideModal) handleHideModal();
  };

  const handleTryAgain = () => {
    dispatch(testDeploymentWithDataset(projectId, deploymentId, dataset));
  };

  return (
    <DeploymentTestResultModal
      testResult={testResult}
      isTestingFlow={isTestingFlow}
      isShowingModal={isShowingModal}
      handleTryAgain={handleTryAgain}
      handleShowLogs={handleShowLogs}
      handleHideModal={handleHideModal}
    />
  );
};

DeploymentTestResultModalContainer.propTypes = {
  projectId: PropTypes.string.isRequired,
  deploymentId: PropTypes.string.isRequired,
  isTestingFlow: PropTypes.bool.isRequired,
  isShowingModal: PropTypes.bool.isRequired,
  handleHideModal: PropTypes.func.isRequired,
};

export default DeploymentTestResultModalContainer;
