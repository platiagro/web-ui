import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  MONITORINGS_TYPES,
  getMonitorings,
  getMonitoringsFigures,
  fetchMonitoringFigures,
} from 'store/monitorings';
import { getDeploymentById } from 'store/deployments';
import { useIsLoading } from 'hooks';
import { MonitoringDrawer } from 'components';

const MonitoringDrawerContainer = ({
  projectId,
  deploymentId,
  isShowingDrawer,
  handleHideDrawer,
}) => {
  const dispatch = useDispatch();

  const deployment = useSelector(getDeploymentById(deploymentId));
  const figures = useSelector(getMonitoringsFigures);
  const monitorings = useSelector(getMonitorings);

  const isLoading = useIsLoading(
    MONITORINGS_TYPES.FETCH_MONITORINGS_REQUEST,
    MONITORINGS_TYPES.FETCH_MONITORING_FIGURES_REQUEST
  );

  const isAdding = useIsLoading(MONITORINGS_TYPES.CREATE_MONITORINGS_REQUEST);

  const handleDownloadAllFigures = () => {
    // TODO: Fazer o download de todos os gráficos
  };

  const handleUpdateLayout = () => {
    // TODO: Salvar a posição dos cards no grid
  };

  const handleAddMonitoring = () => {
    // TODO: Adicionar novo card no grid
  };

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
      handleHideDrawer={handleHideDrawer}
      handleUpdateLayout={handleUpdateLayout}
      handleAddMonitoring={handleAddMonitoring}
      handleDownloadAllFigures={handleDownloadAllFigures}
    />
  );
};

MonitoringDrawerContainer.propTypes = {
  projectId: PropTypes.string.isRequired,
  deploymentId: PropTypes.string,
  isShowingDrawer: PropTypes.bool.isRequired,
  handleHideDrawer: PropTypes.func.isRequired,
};

export default MonitoringDrawerContainer;
