import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { format } from 'date-fns';

import { LOG_TYPES } from 'configs';
import LogsPanel from 'components/LogsPanel';
import LogsModal from 'components/LogsModal';
import { hideLogsPanel } from 'store/ui/actions';
import { useIsLoading, useLogsLongPolling } from 'hooks';
import DEPLOYMENT_LOGS_TYPES from 'store/deploymentLogs/actionTypes';
import {
  clearAllDeploymentLogs,
  getDeployExperimentLogs,
} from 'store/deploymentLogs/actions';

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const operatorsSelector = ({ operatorsReducer }) => {
  return operatorsReducer;
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

  const logs = useSelector(logsSelector);
  const operators = useSelector(operatorsSelector);
  const isShowingLogsPanel = useSelector(isShowingLogsPanelSelector);

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

  const handleFetchLogs = useCallback(() => {
    if (!projectId || !deploymentId) return;
    dispatch(getDeployExperimentLogs(projectId, deploymentId, false));
  }, [dispatch, deploymentId, projectId]);

  useEffect(handleFetchLogs, [handleFetchLogs]);

  useLogsLongPolling({
    handleFetchLogs,
    operators,
  });

  useEffect(() => {
    return () => {
      dispatch(hideLogsPanel());
      dispatch(clearAllDeploymentLogs());
    };
  }, [dispatch]);

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
