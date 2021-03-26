import React from 'react'
import { Skeleton } from 'antd'

const NewMonitoringModalSkeleton = () => {
  return (
    <div className="new-monitoring-modal-skeletons">
      <Skeleton.Button className="new-monitoring-modal-skeleton" size="large" active />
      <Skeleton.Button className="new-monitoring-modal-skeleton" size="large" active />
      <Skeleton.Button className="new-monitoring-modal-skeleton" size="large" active />
      <Skeleton.Button className="new-monitoring-modal-skeleton" size="large" active />
      <Skeleton.Button className="new-monitoring-modal-skeleton" size="large" active />
      <Skeleton.Button className="new-monitoring-modal-skeleton" size="large" active />
    </div>
  )
}

export default NewMonitoringModalSkeleton