import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Typography } from 'antd'
import {
  PlusOutlined,
  FundOutlined,
  DeleteOutlined
} from '@ant-design/icons'

import { Button } from 'uiComponents'

import './styles.less'

const MonitoringToolbar = ({
  className,
  handleAddMonitoring,
  handleSeeMonitoring,
  handleDeleteMonitoring,
  showAddButton,
  showSeeButton,
  showDeleteButton,
}) => {
  return (
    <div className={`monitoring-toolbar ${className}`}>
      <Typography.Title className="toolbar-title" level={4}>
        Monitoramentos
      </Typography.Title>

      {showAddButton && (
        <Button
          shape="round"
          type="primary-inverse"
          icon={<PlusOutlined />}
          handleClick={handleAddMonitoring}>
          Adicionar
        </Button>
      )}

      {showSeeButton && (
        <>
          <Divider className="toolbar-divider" type="vertical" />

          <Button
            shape="round"
            type="primary-inverse"
            icon={<FundOutlined />}
            handleClick={handleSeeMonitoring}>
            Ver Monitoramento
          </Button>
        </>
      )}

      {showDeleteButton && (
        <>
          <Divider className="toolbar-divider" type="vertical" />

          <Button
            shape="round"
            type="primary-inverse"
            icon={<DeleteOutlined />}
            handleClick={handleDeleteMonitoring}>
            Excluir
          </Button>
        </>
      )}
    </div>
  )
}

MonitoringToolbar.propTypes = {
  className: PropTypes.string,
  handleAddMonitoring: PropTypes.func,
  handleSeeMonitoring: PropTypes.func,
  handleDeleteMonitoring: PropTypes.func,
  showAddButton: PropTypes.bool,
  showSeeButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
}

MonitoringToolbar.defaultProps = {
  className: undefined,
  handleAddMonitoring: () => { },
  handleSeeMonitoring: () => { },
  handleDeleteMonitoring: () => { },
  showAddButton: true,
  showSeeButton: false,
  showDeleteButton: false,
}

export default MonitoringToolbar