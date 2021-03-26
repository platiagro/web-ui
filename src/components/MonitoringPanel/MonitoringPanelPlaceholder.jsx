import React from 'react'
import { FundOutlined } from '@ant-design/icons'

const MonitoringPanelPlaceholder = () => {
  return (
    <div className="monitoring-panel-placeholder">
      <div className="monitoring-panel-placeholder-icon">
        <FundOutlined />
      </div>

      <div>Nenhum Monitoramento Adicionado</div>
    </div>
  )
}

export default MonitoringPanelPlaceholder