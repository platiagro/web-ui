import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LogsPanel from 'components/LogsPanel';
import { hideLogsPanel } from 'store/ui/actions';

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const logsSelector = () => {
  return [];
};

const LogsPanelContainer = () => {
  const dispatch = useDispatch();

  const logs = useSelector(logsSelector);
  const isShowingLogsPanel = useSelector(isShowingLogsPanelSelector);

  const handleHideLogsPanel = () => {
    dispatch(hideLogsPanel());
  };

  const handleOpenLogsModal = () => {
    console.log('OPEN LOGS MODAL');
  };

  return isShowingLogsPanel ? (
    <LogsPanel
      logs={logs}
      handleHideLogsPanel={handleHideLogsPanel}
      handleOpenLogsModal={handleOpenLogsModal}
    />
  ) : null;
};

export default LogsPanelContainer;
