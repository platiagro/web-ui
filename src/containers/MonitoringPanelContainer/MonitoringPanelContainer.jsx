import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import MonitoringPanel from 'components/MonitoringPanel';
import MonitoringToolbar from 'components/MonitoringToolbar';
import { deleteMonitoring, fetchMonitorings } from 'store/monitorings/actions';
import NewMonitoringModalContainer from 'containers/NewMonitoringModalContainer';

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
  const [isShowingAddModal, setIsShowingAddModal] = useState(false);
  const [isShowingPanel, setIsShowingPanel] = useState(true);

  const handleSelectMonitoring = (monitoring) => {
    setSelectedMonitoring(monitoring);
  };

  const handleTogglePanel = () => {
    setIsShowingPanel((isShowing) => !isShowing);
  };

  const handleDeleteMonitoring = () => {
    if (!selectedMonitoring || isDeletingMonitoring) return;
    const { uuid: monitoringId } = selectedMonitoring;
    dispatch(deleteMonitoring({ projectId, deploymentId, monitoringId }));
  };

  const handleHideAddMonitoringModal = () => {
    setIsShowingAddModal(false);
  };

  const handleAddMonitoring = () => {
    setIsShowingAddModal(true);
  };

  const handleSeeMonitoring = () => {
    // TODO: Implementar
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
        handleSeeMonitoring={handleSeeMonitoring}
        handleAddMonitoring={handleAddMonitoring}
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

      <NewMonitoringModalContainer
        projectId={projectId}
        deploymentId={deploymentId}
        isShowing={isShowingAddModal}
        handleHideModal={handleHideAddMonitoringModal}
      />
    </div>
  );
};

export default MonitoringPanelContainer;
