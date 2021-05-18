import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  NewMonitoringModalContainer,
  MonitoringDrawerContainer,
} from 'containers';
import { useIsLoading, useToggleState } from 'hooks';
import { MonitoringPanel, MonitoringToolbar } from 'components';
import {
  deleteMonitoring,
  fetchMonitorings,
  getMonitorings,
  MONITORINGS_TYPES,
} from 'store/monitorings';

import useControlPanelVisibilities from './useControlPanelVisibilities';
import useUnselectDeletedMonitoring from './useUnselectDeletedMonitoring';

import './styles.less';

const MonitoringPanelContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const monitorings = useSelector(getMonitorings);

  const isDeletingMonitoring = useIsLoading(
    MONITORINGS_TYPES.DELETE_MONITORINGS_REQUEST
  );

  const isLoadingMonitorings = useIsLoading(
    MONITORINGS_TYPES.FETCH_MONITORINGS_REQUEST
  );

  const [selectedMonitoring, setSelectedMonitoring] = useState(null);

  const [isShowingDrawer, handleToggleDrawer] = useToggleState(false);
  const [isShowingAddModal, handleToggleAddModal] = useToggleState(false);
  const [isShowingPanel, handleTogglePanel, setIsShowingPanel] =
    useToggleState(false);

  const handleSelectMonitoring = (monitoring) => {
    setSelectedMonitoring(monitoring);
  };

  const handleDeleteMonitoring = () => {
    if (!selectedMonitoring || isDeletingMonitoring) return;
    const { uuid: monitoringId } = selectedMonitoring;
    dispatch(deleteMonitoring({ projectId, deploymentId, monitoringId }));
  };

  useEffect(() => {
    if (!projectId || !deploymentId) return;
    dispatch(fetchMonitorings(projectId, deploymentId));
  }, [deploymentId, dispatch, projectId]);

  useUnselectDeletedMonitoring({
    monitorings,
    selectedMonitoring,
    setSelectedMonitoring,
  });

  useControlPanelVisibilities({
    isShowingPanel,
    setIsShowingPanel,
  });

  return (
    <div className='monitoring-panel-container'>
      <MonitoringToolbar
        handleDeleteMonitoring={handleDeleteMonitoring}
        handleAddMonitoring={handleToggleAddModal}
        handleSeeMonitoring={handleToggleDrawer}
        handleTogglePanel={handleTogglePanel}
        showDeleteButton={!!selectedMonitoring}
        showSeeButton={!!monitorings?.length}
        isDeleting={isDeletingMonitoring}
        isShowingPanel={isShowingPanel}
        showAddButton={!!deploymentId}
      />

      {isShowingPanel && (
        <MonitoringPanel
          className='monitoring-panel-content'
          monitorings={monitorings}
          isLoading={isLoadingMonitorings}
          isDeleting={isDeletingMonitoring}
          selectedMonitoring={selectedMonitoring}
          handleSelectMonitoring={handleSelectMonitoring}
        />
      )}

      <MonitoringDrawerContainer
        projectId={projectId}
        deploymentId={deploymentId}
        isShowingDrawer={isShowingDrawer}
        handleHideDrawer={handleToggleDrawer}
      />

      <NewMonitoringModalContainer
        isShowing={isShowingAddModal}
        handleHideModal={handleToggleAddModal}
      />
    </div>
  );
};

export default MonitoringPanelContainer;
