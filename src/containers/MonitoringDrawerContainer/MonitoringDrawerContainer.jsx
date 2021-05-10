import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { MonitoringDrawer } from 'components';

const deploymentSelector = (deploymentId) => ({ deploymentsReducer }) => {
  return deploymentsReducer.find(({ uuid }) => uuid === deploymentId);
};

const loadingSelector = () => {
  return false;
};

const addingSelector = () => {
  return false;
};

const MonitoringDrawerContainer = ({
  monitorings,
  deploymentId,
  isShowingDrawer,
  handleToggleDrawer,
}) => {
  const deployment = useSelector(deploymentSelector(deploymentId));
  const isLoading = useSelector(loadingSelector);
  const isAdding = useSelector(addingSelector);

  const handleDownload = () => {};

  const handleUpdateLayout = () => {};

  const handleAddMonitoringTask = () => {};

  return (
    <MonitoringDrawer
      deploymentName={deployment?.name}
      monitorings={monitorings}
      isAdding={isAdding}
      isLoading={isLoading}
      isShowing={isShowingDrawer}
      handleDownload={handleDownload}
      handleHideDrawer={handleToggleDrawer}
      handleUpdateLayout={handleUpdateLayout}
      handleAddMonitoringTask={handleAddMonitoringTask}
    />
  );
};

MonitoringDrawerContainer.propTypes = {
  monitorings: PropTypes.array.isRequired,
  deploymentId: PropTypes.string.isRequired,
  isShowingDrawer: PropTypes.bool.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
};

export default MonitoringDrawerContainer;
