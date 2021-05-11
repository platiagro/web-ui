import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import {
  getMonitorings,
  getMonitoringsFigures,
  MONITORINGS_TYPES,
} from 'store/monitorings';
import { useIsLoading } from 'hooks';
import { MonitoringDrawer } from 'components';

const deploymentSelector =
  (deploymentId) =>
  ({ deploymentsReducer }) => {
    return deploymentsReducer.find(({ uuid }) => uuid === deploymentId);
  };

const MonitoringDrawerContainer = ({ isShowingDrawer, handleToggleDrawer }) => {
  const { deploymentId } = useParams();

  const deployment = useSelector(deploymentSelector(deploymentId));
  const figures = useSelector(getMonitoringsFigures);
  const monitorings = useSelector(getMonitorings);

  const isLoading = useIsLoading(MONITORINGS_TYPES.FETCH_MONITORINGS_REQUEST);
  const isAdding = useIsLoading(MONITORINGS_TYPES.CREATE_MONITORINGS_REQUEST);

  const handleDownloadAllFigures = () => {};

  const handleUpdateLayout = () => {};

  const handleAddMonitoring = () => {};

  return (
    <MonitoringDrawer
      isAdding={isAdding}
      isLoading={isLoading}
      isShowing={isShowingDrawer}
      figures={figures}
      monitorings={monitorings}
      deploymentName={deployment?.name}
      handleHideDrawer={handleToggleDrawer}
      handleUpdateLayout={handleUpdateLayout}
      handleAddMonitoring={handleAddMonitoring}
      handleDownloadAllFigures={handleDownloadAllFigures}
    />
  );
};

MonitoringDrawerContainer.propTypes = {
  isShowingDrawer: PropTypes.bool.isRequired,
  handleToggleDrawer: PropTypes.func.isRequired,
};

export default MonitoringDrawerContainer;
