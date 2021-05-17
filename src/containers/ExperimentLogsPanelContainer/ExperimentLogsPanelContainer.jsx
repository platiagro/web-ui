import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { LOG_TYPES } from 'configs';
import { useLogsLongPolling } from 'hooks';
import LogsPanel from 'components/LogsPanel';
import LogsModal from 'components/LogsModal';
import { hideLogsPanel } from 'store/ui/actions';
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

const operatorsSelector = ({ operatorsReducer }) => {
  return operatorsReducer;
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
    if (!projectId || !experimentId) return;
    dispatch(getExperimentLogs(projectId, experimentId));
  }, [dispatch, experimentId, projectId]);

  useEffect(handleFetchLogs, [handleFetchLogs]);

  useLogsLongPolling({
    operators,
    handleFetchLogs,
  });

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
