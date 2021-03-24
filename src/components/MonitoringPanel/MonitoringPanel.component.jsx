import React from 'react'
import { Skeleton } from 'antd'
import PropTypes from 'prop-types'
import { FundOutlined } from '@ant-design/icons'

import MonitoringFlowBox from 'components/MonitoringFlowBox'

import './styles.less'

const MonitoringPanel = ({
  className,
  isLoading,
  isDeleting,
  monitorings,
  selectedMonitoring,
  handleSelectMonitoring
}) => {
  const getMonitoringFFlowBoxStatus = (isSelected, isDeleting) => {
    if (isSelected) return isDeleting ? 'pending' : 'success'
    return 'default'
  }

  return (
    <div className={`monitoring-panel ${className}`}>
      {isLoading ? (
        <>
          <Skeleton.Button className="monitoring-panel-skeleton" size="large" active />
          <Skeleton.Button className="monitoring-panel-skeleton" size="large" active />
          <Skeleton.Button className="monitoring-panel-skeleton" size="large" active />
        </>
      ) : (
        <>
          {monitorings && monitorings.length > 0 ? (
            <div className="monitoring-panel-list">
              {monitorings.map((monitoring, index) => {
                const handleSelectThisItem = () => {
                  if (handleSelectMonitoring) handleSelectMonitoring(monitoring)
                }

                const isSelected =
                  !!selectedMonitoring &&
                  selectedMonitoring.monitoringId === monitoring.monitoringId

                const status = getMonitoringFFlowBoxStatus(isSelected, isDeleting)

                return (
                  <MonitoringFlowBox
                    key={monitoring.monitoringId}
                    onClick={handleSelectThisItem}
                    title={monitoring.title || `Monitoramento ${index + 1}`}
                    status={status}
                  />
                )
              })}
            </div>
          ) : (
            <div className="monitoring-panel-placeholder">
              <div className="monitoring-panel-placeholder-icon">
                <FundOutlined />
              </div>

              <div>Nenhum Monitoramento Adicionado</div>
            </div>
          )}
        </>
      )
      }
    </div>
  )
}

const monitoringShape = {
  monitoringId: PropTypes.string
}

MonitoringPanel.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  isDeleting: PropTypes.bool,
  monitorings: PropTypes.arrayOf(PropTypes.shape(monitoringShape)),
  selectedMonitoring: PropTypes.shape(monitoringShape),
  handleSelectMonitoring: PropTypes.func,
}

MonitoringPanel.defaultProps = {
  className: undefined,
  isLoading: false,
  isDeleting: false,
  monitorings: [],
  handleSelectMonitoring: () => { }
}

export default MonitoringPanel