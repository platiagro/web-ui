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

const logsSelector = ({ deploymentLogsReducer }) => {
  // * Map the array to pass as a prop to LogsPanel

  let logsArray = [];

  deploymentLogsReducer.logs.forEach((operatorLog) => {
    const transformedLogs = operatorLog.logs.map((log) => {
      const formattedDate = format(
        new Date(log.timestamp.trim()),
        'dd/MM/yyyy hh:mm:ss'
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

  return isShowingLogsPanel ? (
    <LogsPanel
      logs={logs}
      handleHideLogsPanel={handleHideLogsPanel}
      handleOpenLogsModal={handleOpenLogsModal}
    />
  ) : null;
};

export default DeploymentLogsPanelContainer;
