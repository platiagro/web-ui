import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import LogsPanel from 'components/LogsPanel';
import { hideLogsPanel } from 'store/ui/actions';

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

const logsSelector = ({ operatorReducer }) => {
  return operatorReducer.logs;
};

const ExperimentLogsPanelContainer = () => {
  const dispatch = useDispatch();
  const { projectId, experimentId } = useParams();

  const logs = useSelector(logsSelector);
  const isShowingLogsPanel = useSelector(isShowingLogsPanelSelector);

  const handleHideLogsPanel = () => {
    dispatch(hideLogsPanel());
  };

  const handleOpenLogsModal = () => {
    console.log('OPEN LOGS MODAL');
  };

  useEffect(() => {
    // Substituir o código abaixo pela action que realmente busca os logs
    dispatch({ type: '@TEMP/FETCH_EXPERIMENT_LOGS' });
  }, [dispatch, experimentId, projectId]);

  return isShowingLogsPanel ? (
    <LogsPanel
      logs={logs}
      handleHideLogsPanel={handleHideLogsPanel}
      handleOpenLogsModal={handleOpenLogsModal}
    />
  ) : null;
};

export default ExperimentLogsPanelContainer;
