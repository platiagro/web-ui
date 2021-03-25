import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import MonitoringPanel from 'components/MonitoringPanel'
import MonitoringToolbar from 'components/MonitoringToolbar'
import { deleteMonitoring, fetchMonitorings } from 'store/monitorings/actions'

import './styles.less'

const monitoringsLoadingSelector = ({ uiReducer }) => {
  return uiReducer.monitorings.loading
}

const monitoringsDeletingSelector = ({ uiReducer }) => {
  return uiReducer.monitorings.deleting
}

const monitoringsSelector = ({ monitoringsReducer }) => {
  return monitoringsReducer.monitorings
}

const MonitoringPanelContainer = () => {
  const { projectId, deploymentId } = useParams()
  const dispatch = useDispatch()

  const isDeletingMonitoring = useSelector(monitoringsDeletingSelector)
  const isLoadingMonitorings = useSelector(monitoringsLoadingSelector)
  const monitorings = useSelector(monitoringsSelector)

  const [selectedMonitoring, setSelectedMonitoring] = useState(null)
  const [isShowingPanel, setIsShowingPanel] = useState(true)

  const handleSelectMonitoring = (monitoring) => {
    setSelectedMonitoring(monitoring)
  }

  const handleTogglePanel = () => {
    setIsShowingPanel((isShowing) => !isShowing)
  }

  const handleDeleteMonitoring = () => {
    if (!selectedMonitoring || isDeletingMonitoring) return
    const { uuid: monitoringId } = selectedMonitoring
    dispatch(deleteMonitoring({ projectId, deploymentId, monitoringId }))
  }

  const handleAddMonitoring = () => {
    // TODO: Implementar
  }

  const handleSeeMonitoring = () => {
    // TODO: Implementar
  }

  useEffect(() => {
    if (!projectId || !deploymentId) return
    dispatch(fetchMonitorings(projectId, deploymentId))
  }, [deploymentId, dispatch, projectId])

  // Clear the selected monitoring when the monitorings list changes
  useEffect(() => {
    if (!selectedMonitoring) return

    const selectedMonitoringIndex = monitorings.findIndex((monitoring) => {
      return monitoring.uuid === selectedMonitoring.uuid
    })

    if (selectedMonitoringIndex === -1) {
      setSelectedMonitoring(null)
    }
  }, [monitorings, selectedMonitoring])

  return (
    <div className="monitoring-panel-container">
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
          className="monitoring-panel-content"
          monitorings={monitorings}
          isLoading={isLoadingMonitorings}
          isDeleting={isDeletingMonitoring}
          selectedMonitoring={selectedMonitoring}
          handleSelectMonitoring={handleSelectMonitoring}
        />
      )}
    </div>
  )
}

export default MonitoringPanelContainer