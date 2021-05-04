import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideLogsPanel } from 'store/ui/actions';

const isShowingLogsPanelSelector = ({ uiReducer }) => {
  return uiReducer.logsPanel.isShowing;
};

export default ({
  isShowingPanel: isShowingMonitoringPanel,
  setIsShowingPanel: setIsShowingMonitoringPanel,
}) => {
  const dispatch = useDispatch();

  const isShowingLogsPanel = useSelector(isShowingLogsPanelSelector);

  useEffect(() => {
    if (isShowingLogsPanel) setIsShowingMonitoringPanel(false);
  }, [isShowingLogsPanel, setIsShowingMonitoringPanel]);

  useEffect(() => {
    if (isShowingMonitoringPanel) dispatch(hideLogsPanel());
  }, [dispatch, isShowingMonitoringPanel]);
};
