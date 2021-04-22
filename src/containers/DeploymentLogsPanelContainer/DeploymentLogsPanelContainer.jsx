import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { LOG_TYPES } from 'configs';
import LogsPanel from 'components/LogsPanel';
import { hideLogsPanel } from 'store/ui/actions';
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import LogsModal from 'components/LogsModal';

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
        type: log.level || LOG_TYPES.INFO,
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

  const [isShowingModal, setIsShowingModal] = useState(false);

  const logs = useSelector(logsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const isShowingLogsPanel = useSelector(isShowingLogsPanelSelector);

  const handleHideLogsPanel = () => {
    dispatch(hideLogsPanel());
  };

  const handleShowLogsModal = () => {
    setIsShowingModal(true);
  };

  const handleHideLogsModal = () => {
    setIsShowingModal(false);
  };

  useEffect(() => {
    dispatch(getDeployExperimentLogs(projectId, deploymentId, false));
  }, [dispatch, deploymentId, projectId]);

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
