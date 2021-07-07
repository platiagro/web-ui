import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLoading } from 'hooks';
import { LogsDrawer } from 'components';
import { hideInferenceLogsDrawer } from 'store/ui/actions';
import DEPLOYMENT_LOGS_TYPES from 'store/deploymentLogs/actionTypes';

const logsSelector = ({ deploymentLogsReducer }) => {
  return deploymentLogsReducer.logs || [];
};

const isVisibleSelector = ({ uiReducer }) => {
  return uiReducer.inferenceLogsDrawer.visible;
};

const titleSelector = ({ uiReducer }) => {
  return uiReducer.inferenceLogsDrawer.title;
};

const LogsDrawerContainer = () => {
  const dispatch = useDispatch();

  const isVisible = useSelector(isVisibleSelector);
  const title = useSelector(titleSelector);
  const logs = useSelector(logsSelector);

  const isLoading = useIsLoading(DEPLOYMENT_LOGS_TYPES.GET_DEPLOYMENT_LOGS);

  const handleHideDrawer = () => {
    dispatch(hideInferenceLogsDrawer());
  };

  return (
    <LogsDrawer
      handleClose={handleHideDrawer}
      isLoading={isLoading}
      isVisible={isVisible}
      logs={logs}
      title={title}
    />
  );
};

export default LogsDrawerContainer;
