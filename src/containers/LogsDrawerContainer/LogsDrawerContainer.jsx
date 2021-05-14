import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LogsDrawer } from 'components';
import { hideInferenceLogsDrawer } from 'store/ui/actions';

const logsSelector = ({ deploymentLogsReducer }) => {
  return deploymentLogsReducer.logs || [];
};

const isLoadingSelector = ({ uiReducer }) => {
  return uiReducer.inferenceLogsDrawer.loading;
};

const isVisibleSelector = ({ uiReducer }) => {
  return uiReducer.inferenceLogsDrawer.visible;
};

const titleSelector = ({ uiReducer }) => {
  return uiReducer.inferenceLogsDrawer.title;
};

const LogsDrawerContainer = () => {
  const dispatch = useDispatch();

  const handleHideDrawer = () => {
    dispatch(hideInferenceLogsDrawer());
  };

  const isLoading = useSelector(isLoadingSelector);
  const isVisible = useSelector(isVisibleSelector);
  const title = useSelector(titleSelector);
  const logs = useSelector(logsSelector);

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
