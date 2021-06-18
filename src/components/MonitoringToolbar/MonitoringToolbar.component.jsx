import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Popconfirm, Typography } from 'antd';
import {
  UpOutlined,
  PlusOutlined,
  FundOutlined,
  DownOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { Button } from 'uiComponents';

import './styles.less';

const MonitoringToolbar = ({
  className,
  isDeleting,
  isShowingPanel,
  showAddButton,
  showSeeButton,
  showDeleteButton,
  handleTogglePanel,
  handleAddMonitoring,
  handleSeeMonitoring,
  handleDeleteMonitoring,
}) => {
  const [isConfirmingToDelete, setIsConfirmingToDelete] = useState(false);

  const handleToggleDeleteConfirmation = () => {
    setIsConfirmingToDelete((isShowing) => !isShowing);
  };

  const handleDeleteMonitoringAndHideConfirmation = () => {
    setIsConfirmingToDelete(false);
    if (handleDeleteMonitoring) handleDeleteMonitoring();
  };

  useEffect(() => {
    // Hides the delete confirmation modal if the delete button
    // or the panel is hidden
    if (!showDeleteButton || !isShowingPanel) {
      setIsConfirmingToDelete(false);
    }
  }, [isShowingPanel, showDeleteButton]);

  return (
    <div className={`monitoring-toolbar ${className}`}>
      <Typography.Title className='monitoring-toolbar-title' level={4}>
        Monitoramentos
      </Typography.Title>

      {showAddButton && (
        <Button
          className='monitoring-toolbar-add-button'
          shape='round'
          type='primary-inverse'
          icon={<PlusOutlined />}
          handleClick={handleAddMonitoring}
        >
          <span className='monitoring-toolbar-button-text'>Adicionar</span>
        </Button>
      )}

      {showSeeButton && (
        <>
          <Divider className='monitoring-toolbar-divider' type='vertical' />

          <Button
            className='monitoring-toolbar-see-button'
            shape='round'
            type='primary-inverse'
            icon={<FundOutlined />}
            handleClick={handleSeeMonitoring}
          >
            <span className='monitoring-toolbar-button-text'>
              Ver Monitoramentos
            </span>
          </Button>
        </>
      )}

      {showDeleteButton && (
        <>
          <Divider className='monitoring-toolbar-divider' type='vertical' />

          <Popconfirm
            visible={isConfirmingToDelete}
            okType='danger'
            okText='Excluir'
            placement='topLeft'
            cancelText='Cancelar'
            title='Excluir o Monitoramento Selecionado?'
            onCancel={handleToggleDeleteConfirmation}
            onConfirm={handleDeleteMonitoringAndHideConfirmation}
          >
            <Button
              className='monitoring-toolbar-delete-button'
              shape='round'
              type='primary-inverse'
              isLoading={isDeleting}
              icon={<DeleteOutlined />}
              handleClick={handleToggleDeleteConfirmation}
            >
              <span className='monitoring-toolbar-button-text'>Excluir</span>
            </Button>
          </Popconfirm>
        </>
      )}

      <Button
        className='monitoring-toolbar-toggle-button'
        shape='circle'
        type='ghost'
        icon={isShowingPanel ? <DownOutlined /> : <UpOutlined />}
        handleClick={handleTogglePanel}
      ></Button>
    </div>
  );
};

MonitoringToolbar.propTypes = {
  className: PropTypes.string,
  isDeleting: PropTypes.bool,
  isShowingPanel: PropTypes.bool,
  showAddButton: PropTypes.bool,
  showSeeButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  handleTogglePanel: PropTypes.func,
  handleAddMonitoring: PropTypes.func,
  handleSeeMonitoring: PropTypes.func,
  handleDeleteMonitoring: PropTypes.func,
};

MonitoringToolbar.defaultProps = {
  className: '',
  isDeleting: false,
  isShowingPanel: true,
  showAddButton: true,
  showSeeButton: false,
  showDeleteButton: false,
  handleTogglePanel: undefined,
  handleAddMonitoring: undefined,
  handleSeeMonitoring: undefined,
  handleDeleteMonitoring: undefined,
};

export default MonitoringToolbar;
