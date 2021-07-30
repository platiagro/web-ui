import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { LOG_TYPES } from 'configs';
import LogsPanel from 'components/LogsPanel';
import LogsModal from 'components/LogsModal';
import { hideLogsPanel } from 'store/ui/actions';
import { useDeepEqualSelector } from 'hooks';
import {
  clearAllExperimentLogs,
  getExperimentLogs,
} from 'store/experimentLogs/actions';

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const isLoadingSelector = ({ experimentLogsReducer }) => {
  return experimentLogsReducer.isLoading;
};

const logsSelector = ({ experimentLogsReducer }) => {
  return experimentLogsReducer.logs.map((log, index) => {
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

const ExperimentLogsPanelContainer = () => {
  const dispatch = useDispatch();
  const { projectId, experimentId } = useParams();

  const [isShowingModal, setIsShowingModal] = useState(false);

  const logs = useDeepEqualSelector(logsSelector);
  const isLoading = useDeepEqualSelector(isLoadingSelector);
  const isShowingLogsPanel = useDeepEqualSelector(isShowingLogsPanelSelector);

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
      if (!projectId || !experimentId) return;
      dispatch(getExperimentLogs(projectId, experimentId, shouldShowLoading));
    },
    [dispatch, experimentId, projectId]
  );

  useEffect(handleFetchLogs, [handleFetchLogs]);

  useEffect(() => {
    const polling = setInterval(() => {
      handleFetchLogs(false);
    }, 5000);

    return () => clearInterval(polling);
  }, [handleFetchLogs]);

  useEffect(() => {
    return () => {
      dispatch(hideLogsPanel());
      dispatch(clearAllExperimentLogs());
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
        isLoading={isLoading && logs.length === 0}
        handleHideLogsPanel={handleHideLogsPanel}
        handleShowLogsModal={handleShowLogsModal}
        style={{ display: isShowingLogsPanel ? undefined : 'none' }}
      />
    </>
  );
};

export default ExperimentLogsPanelContainer;
