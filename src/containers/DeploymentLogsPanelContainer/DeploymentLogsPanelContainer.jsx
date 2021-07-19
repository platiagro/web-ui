import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { LOG_TYPES } from 'configs';
import LogsPanel from 'components/LogsPanel';
import LogsModal from 'components/LogsModal';
import { hideLogsPanel } from 'store/ui/actions';
import { useIsLoading, useDeepEqualSelector } from 'hooks';
import DEPLOYMENT_LOGS_TYPES from 'store/deploymentLogs/actionTypes';
import {
  clearAllDeploymentLogs,
  getDeployExperimentLogs,
} from 'store/deploymentLogs/actions';

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const logsSelector = ({ deploymentLogsReducer }) => {
  return deploymentLogsReducer.logs.map((log, index) => {
    const formattedDate = format(
      new Date(log.createdAt.trim()),
      'hh:mm:ss dd/MM/yyyy'
    );

    return {
      uuid: `${index} - ${log.createdAt}`,
      type: log.level || LOG_TYPES.INFO,
      title: `${log.title} - ${formattedDate}`,
      message: log.message,
    };
  });
};

const DeploymentLogsPanelContainer = () => {
  const dispatch = useDispatch();
  const { projectId, deploymentId } = useParams();

  const [isShowingModal, setIsShowingModal] = useState(false);

  const logs = useDeepEqualSelector(logsSelector);
  const isShowingLogsPanel = useDeepEqualSelector(isShowingLogsPanelSelector);

  const isLoading = useIsLoading(DEPLOYMENT_LOGS_TYPES.GET_DEPLOYMENT_LOGS);

  const handleHideLogsPanel = () => {
    dispatch(hideLogsPanel());
  };

  const handleShowLogsModal = () => {
    setIsShowingModal(true);
  };

  const handleHideLogsModal = () => {
    setIsShowingModal(false);
  };

  const handleFetchLogs = useCallback(
    (shouldShowLoading = true) => {
      if (!projectId || !deploymentId) return;
      dispatch(
        getDeployExperimentLogs(
          projectId,
          deploymentId,
          false,
          shouldShowLoading
        )
      );
    },
    [dispatch, deploymentId, projectId]
  );

  useEffect(() => {
    handleFetchLogs(true);
  }, [handleFetchLogs]);

  useEffect(() => {
    return () => {
      dispatch(hideLogsPanel());
      dispatch(clearAllDeploymentLogs());
    };
  }, [dispatch]);

  useEffect(() => {
    const polling = setInterval(() => {
      handleFetchLogs(false);
    }, 5000);

    return () => clearInterval(polling);
  }, [handleFetchLogs]);

  return (
    <>
      <LogsModal
        logs={logs}
        isShowing={isShowingModal}
        handleHideModal={handleHideLogsModal}
      />

      <LogsPanel
        logs={logs}
        isLoading={isLoading}
        handleHideLogsPanel={handleHideLogsPanel}
        handleShowLogsModal={handleShowLogsModal}
        style={{ display: isShowingLogsPanel ? undefined : 'none' }}
      />
    </>
  );
};

export default DeploymentLogsPanelContainer;
