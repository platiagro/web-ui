import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  getDataset,
  getPredictionId,
  getPredictionResult,
  getStatus,
  fetchPredictionRequest,
  createPredictionWithDataset,
} from 'store/prediction';
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
  const predictionId = useSelector(getPredictionId);
  const status = useSelector(getStatus);
  const predictionResult = useSelector(getPredictionResult);

  useEffect(() => {
    if (predictionId && status == 'started') {
      dispatch(fetchPredictionRequest(projectId, deploymentId, predictionId));

      const polling = setInterval(() => {
        dispatch(fetchPredictionRequest(projectId, deploymentId, predictionId));
      }, 5000);
      return () => clearInterval(polling);
    }
  }, [dispatch, deploymentId, projectId, predictionId, status]);

  const handleShowLogs = () => {
    dispatch(getDeployExperimentLogs(projectId, deploymentId, false));
    dispatch(showLogsPanel());
    if (handleHideModal) handleHideModal();
  };

  const handleTryAgain = () => {
    dispatch(createPredictionWithDataset(projectId, deploymentId, dataset));
  };

  return (
    <DeploymentTestResultModal
      testResult={predictionResult}
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
  deploymentId: PropTypes.string,
  isTestingFlow: PropTypes.bool.isRequired,
  isShowingModal: PropTypes.bool.isRequired,
  handleHideModal: PropTypes.func.isRequired,
};

export default DeploymentTestResultModalContainer;
