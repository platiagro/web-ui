import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import LogsPanel from 'components/LogsPanel';
import { hideLogsPanel } from 'store/ui/actions';
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const isLoadingSelector = ({ uiReducer }) => {
  return uiReducer.inferenceLogsDrawer.loading;
};

const logsSelector = ({ deploymentLogsReducer }) => {
  // * Map the array to pass as a prop to LogsPanel

  let logsArray = [];

  deploymentLogsReducer.logs.forEach((operatorLog) => {
    const transformedLogs = operatorLog.logs.map((log) => {
      const formattedDate = format(
        new Date(log.timestamp.trim()),
        'hh:mm:ss dd/MM/yyyy'
      );

      return {
        uuid: log.timestamp,
        type: log.level || 'INFO',
        title: `${operatorLog.containerName} - ${formattedDate}`,
        message: log.message,
      };
    });

    logsArray = [...logsArray, ...transformedLogs];
  });

  return logsArray;
};

const DeploymentLogsPanelContainer = () => {
  const dispatch = useDispatch();
  const { projectId, deploymentId } = useParams();

  const logs = useSelector(logsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const isShowingLogsPanel = useSelector(isShowingLogsPanelSelector);

  const handleHideLogsPanel = () => {
    dispatch(hideLogsPanel());
  };

  const handleOpenLogsModal = () => {
    console.log('OPEN LOGS MODAL');
  };

  useEffect(() => {
    dispatch(getDeployExperimentLogs(projectId, deploymentId));
  }, [dispatch, deploymentId, projectId]);

  return (
    <LogsPanel
      style={{ display: isShowingLogsPanel ? undefined : 'none' }}
      logs={logs}
      isLoading={isLoading}
      handleHideLogsPanel={handleHideLogsPanel}
      handleOpenLogsModal={handleOpenLogsModal}
    />
  );
};

export default DeploymentLogsPanelContainer;
