import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Divider, Popconfirm, Typography } from 'antd'
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
  isDeleting,
}) => {
  const [
    isShowingDeleteConfirmation,
    setIsShowingDeleteConfirmation
  ] = useState(false)

  const handleToggleDeleteConfirmation = () => {
    setIsShowingDeleteConfirmation((isShowing) => !isShowing)
  }

  const handleDeleteMonitoringAndHideConfirmation = () => {
    setIsShowingDeleteConfirmation(false)
    if (handleDeleteMonitoring) handleDeleteMonitoring()
  }

  useEffect(() => {
    // Hides the delete confirmation modal if the delete button 
    // or the panel is hidden
    if (!showDeleteButton || !isShowingPanel) {
      setIsShowingDeleteConfirmation(false)
    }
  }, [isShowingPanel, showDeleteButton])

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

          <Popconfirm
            onConfirm={handleDeleteMonitoringAndHideConfirmation}
            onCancel={handleToggleDeleteConfirmation}
            visible={isShowingDeleteConfirmation}
            title="Excluir o Monitoramento Selecionado?"
            placement="topLeft"
            cancelText="Cancelar"
            okText="Excluir"
            okType="danger"
          >
            <Button
              shape="round"
              type="primary-inverse"
              icon={<DeleteOutlined />}
              handleClick={handleToggleDeleteConfirmation}
              isLoading={isDeleting}
            >
              Excluir
            </Button>
          </Popconfirm>
        </>
      )
      }

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
  handleTogglePanel: PropTypes.func,
  isDeleting: PropTypes.bool,
}

MonitoringToolbar.defaultProps = {
  className: '',
  handleAddMonitoring: undefined,
  handleSeeMonitoring: undefined,
  handleDeleteMonitoring: undefined,
  showAddButton: true,
  showSeeButton: false,
  showDeleteButton: false,
  isShowingPanel: true,
  handleTogglePanel: undefined,
  isDeleting: false
}

export default MonitoringToolbar