import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import {
  NewMonitoringModalContainer,
  MonitoringDrawerContainer,
} from 'containers';
import { useToggleState } from 'hooks';
import { MonitoringPanel, MonitoringToolbar } from 'components';
import { deleteMonitoring, fetchMonitorings } from 'store/monitorings/actions';

import useControlPanelVisibilities from './useControlPanelVisibilities';
import useUnselectDeletedMonitoring from './useUnselectDeletedMonitoring';

import './styles.less';

const monitoringsDeletingSelector = ({ uiReducer }) => {
  return uiReducer.monitorings.deleting;
};

const monitoringsLoadingSelector = ({ uiReducer }) => {
  return uiReducer.monitorings.loading;
};

const monitoringsSelector = ({ monitoringsReducer }) => {
  return monitoringsReducer.monitorings;
};

const MonitoringPanelContainer = () => {
  const { projectId, deploymentId } = useParams();
  const dispatch = useDispatch();

  const isDeletingMonitoring = useSelector(monitoringsDeletingSelector);
  const isLoadingMonitorings = useSelector(monitoringsLoadingSelector);
  const monitorings = useSelector(monitoringsSelector);

  const [selectedMonitoring, setSelectedMonitoring] = useState(null);

  const [isShowingDrawer, handleToggleDrawer] = useToggleState(true);
  const [isShowingAddModal, handleToggleAddModal] = useToggleState(false);
  const [isShowingPanel, handleTogglePanel, setIsShowingPanel] = useToggleState(
    true
  );

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
        showSeeButton={!!selectedMonitoring}
        isDeleting={isDeletingMonitoring}
        isShowingPanel={isShowingPanel}
        showAddButton
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
        monitorings={monitorings}
        deploymentId={deploymentId}
        isShowingDrawer={isShowingDrawer}
        handleToggleDrawer={handleToggleDrawer}
      />

      <NewMonitoringModalContainer
        projectId={projectId}
        deploymentId={deploymentId}
        isShowing={isShowingAddModal}
        handleHideModal={handleToggleAddModal}
      />
    </div>
  );
};

export default MonitoringPanelContainer;
