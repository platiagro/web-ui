import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { LOG_TYPES } from 'configs';
import LogsPanel from 'components/LogsPanel';
import LogsModal from 'components/LogsModal';
import { hideLogsPanel } from 'store/ui/actions';
import { getDeployExperimentLogs } from 'store/deploymentLogs/actions';
import { useLogsLongPolling } from 'hooks';

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const isLoadingSelector = ({ uiReducer }) => {
  return uiReducer.inferenceLogsDrawer.loading;
};

const operatorsSelector = ({ deploymentOperatorsReducer }) => {
  return deploymentOperatorsReducer;
};

const logsSelector = ({ deploymentLogsReducer }) => {
  return deploymentLogsReducer.logs.map((log) => {
    const formattedDate = format(
      new Date(log.createdAt.trim()),
      'hh:mm:ss dd/MM/yyyy'
    );

    return {
      uuid: log.createdAt,
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
