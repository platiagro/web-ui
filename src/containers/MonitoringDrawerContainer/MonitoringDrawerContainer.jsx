import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  MONITORINGS_TYPES,
  getMonitorings,
  getMonitoringsFigures,
  fetchMonitoringFigures,
} from 'store/monitorings';
import { useIsLoading } from 'hooks';
import { MonitoringDrawer } from 'components';

const deploymentSelector =
  (deploymentId) =>
  ({ deploymentsReducer }) => {
    return deploymentsReducer.find(({ uuid }) => uuid === deploymentId);
  };

const MonitoringDrawerContainer = ({ isShowingDrawer, handleToggleDrawer }) => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const deployment = useSelector(deploymentSelector(deploymentId));
  const figures = useSelector(getMonitoringsFigures);
  const monitorings = useSelector(getMonitorings);

  const isLoading = useIsLoading(
    MONITORINGS_TYPES.FETCH_MONITORINGS_REQUEST,
    MONITORINGS_TYPES.FETCH_MONITORING_FIGURES_REQUEST
  );

  const isAdding = useIsLoading(MONITORINGS_TYPES.CREATE_MONITORINGS_REQUEST);

  const handleDownloadAllFigures = () => {};

  const handleUpdateLayout = () => {};

  const handleAddMonitoring = () => {};

  useEffect(() => {
    if (isShowingDrawer) {
      monitorings.forEach(({ uuid: monitoringId }) => {
        dispatch(
          fetchMonitoringFigures({
            projectId,
            deploymentId,
            monitoringId,
          })
        );
      });
    }
  }, [deploymentId, dispatch, isShowingDrawer, monitorings, projectId]);

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
