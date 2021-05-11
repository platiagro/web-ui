import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { MonitoringDrawer } from 'components';
import { useIsLoading } from 'hooks';

const deploymentSelector =
  (deploymentId) =>
  ({ deploymentsReducer }) => {
    return deploymentsReducer.find(({ uuid }) => uuid === deploymentId);
  };

const monitoringsSelector = ({ monitoringsReducer }) => {
  return monitoringsReducer.monitorings;
};

const figuresSelector = ({ monitoringsReducer }) => {
  return monitoringsReducer.figures;
};

const MonitoringDrawerContainer = ({ isShowingDrawer, handleToggleDrawer }) => {
  const { deploymentId } = useParams();

  const deployment = useSelector(deploymentSelector(deploymentId));
  const monitorings = useSelector(monitoringsSelector);
  const figures = useSelector(figuresSelector);

  const isLoading = useIsLoading('LOADING_FIGURES');
  const isAdding = useIsLoading('ADDING_MONITORING');

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
