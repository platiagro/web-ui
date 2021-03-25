import React from 'react'
import PropTypes from 'prop-types'
import { Divider, Typography } from 'antd'
import {
  PlusOutlined,
  FundOutlined,
  DeleteOutlined,
  DownOutlined,
  UpOutlined,
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
  isShowingPanel,
  handleTogglePanel,
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

      <Button
        className="toolbar-toggle-button"
        shape="circle"
        type="ghost"
        icon={isShowingPanel ? <UpOutlined /> : <DownOutlined />}
        handleClick={handleTogglePanel}>
      </Button>
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
  isShowingPanel: PropTypes.bool,
  handleTogglePanel: PropTypes.bool,
}

MonitoringToolbar.defaultProps = {
  className: '',
  handleAddMonitoring: () => { },
  handleSeeMonitoring: () => { },
  handleDeleteMonitoring: () => { },
  showAddButton: true,
  showSeeButton: false,
  showDeleteButton: false,
  isShowingPanel: true,
  handleTogglePanel: () => { }
}

export default MonitoringToolbar