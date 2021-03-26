import React from 'react'
import { Skeleton } from 'antd'

const MonitoringPanelSkeleton = () => {
  return (
    <div className="monitoring-panel-skeletons">
      <Skeleton.Button className="monitoring-panel-skeleton" size="large" active />
      <Skeleton.Button className="monitoring-panel-skeleton" size="large" active />
      <Skeleton.Button className="monitoring-panel-skeleton" size="large" active />
    </div>
  )
}

export default MonitoringPanelSkeleton