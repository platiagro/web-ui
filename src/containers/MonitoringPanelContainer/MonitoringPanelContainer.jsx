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

const monitoringsSelector = ({ monitoringsReducer }) => {
  return monitoringsReducer.monitorings
}

const MonitoringPanelContainer = () => {
  const { projectId, deploymentId } = useParams()
  const dispatch = useDispatch()

  const isLoadingMonitorings = useSelector(monitoringsLoadingSelector)
  const monitorings = useSelector(monitoringsSelector)

  const [selectedMonitoring, setSelectedMonitoring] = useState(null)

  const handleSelectMonitoring = (monitoring) => {
    setSelectedMonitoring(monitoring)
  }

  const handleDeleteMonitoring = () => {
    if (!selectedMonitoring) return
    const { monitoringId } = selectedMonitoring
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

  return (
    <div className="monitoring-panel-container">
      <MonitoringToolbar
        handleDeleteMonitoring={handleDeleteMonitoring}
        handleSeeMonitoring={handleSeeMonitoring}
        handleAddMonitoring={handleAddMonitoring}
        showDeleteButton={!!selectedMonitoring}
        showSeeButton={!!selectedMonitoring}
        showAddButton
      />

      <MonitoringPanel
        monitorings={monitorings}
        isLoading={isLoadingMonitorings}
        selectedMonitoring={selectedMonitoring}
        handleSelectMonitoring={handleSelectMonitoring}
      />
    </div>
  )
}

export default MonitoringPanelContainer