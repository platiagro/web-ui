import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { LOG_TYPES } from 'configs';
import LogsPanel from 'components/LogsPanel';
import LogsModal from 'components/LogsModal';
import { hideLogsPanel } from 'store/ui/actions';
import { getExperimentLogs } from 'store/experimentLogs/actions';

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const isLoadingSelector = ({ experimentLogsReducer }) => {
  return experimentLogsReducer.isLoading;
};

const logsSelector = ({ experimentLogsReducer }) => {
  return experimentLogsReducer.logs.map((log) => {
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

const ExperimentLogsPanelContainer = () => {
  const dispatch = useDispatch();
  const { projectId, experimentId } = useParams();

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
    if (!projectId || !experimentId) return;
    dispatch(getExperimentLogs(projectId, experimentId));
  }, [dispatch, experimentId, projectId]);

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

export default ExperimentLogsPanelContainer;
