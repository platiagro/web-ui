import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'antd';
import { CloseOutlined, ExpandOutlined } from '@ant-design/icons';

import LogTypeTags from 'components/LogTypeTags';

import './styles.less';

const LogsPanel = ({ logs, handleHideLogsPanel, handleOpenLogsModal }) => {
  const [isErrorTagSelected, setIsErrorTagSelected] = useState(false);
  const [isInfoTagSelected, setIsInfoTagSelected] = useState(false);
  const [isDebugTagSelected, setIsDebugTagSelected] = useState(false);

  const handleToggleErrorTag = () => {
    setIsErrorTagSelected((isSelected) => !isSelected);
  };

  const handleToggleInfoTag = () => {
    setIsInfoTagSelected((isSelected) => !isSelected);
  };

  const handleToggleDebugTag = () => {
    setIsDebugTagSelected((isSelected) => !isSelected);
  };

  return (
    <div className='logs-panel'>
      <div className='logs-panel-toolbar'>
        <div className='logs-panel-toolbar-title'>
          Histórico de Erros e Mensagens
        </div>

        <LogTypeTags
          isErrorTagSelected={isErrorTagSelected}
          isInfoTagSelected={isInfoTagSelected}
          isDebugTagSelected={isDebugTagSelected}
          handleToggleErrorTag={handleToggleErrorTag}
          handleToggleInfoTag={handleToggleInfoTag}
          handleToggleDebugTag={handleToggleDebugTag}
        />

        <Divider className='logs-panel-toolbar-divider' type='vertical' />

        <Button
          className='logs-panel-toolbar-button'
          onClick={handleOpenLogsModal}
          icon={<ExpandOutlined />}
          shape='circle'
          type='ghost'
        />

        <Button
          className='logs-panel-toolbar-button'
          onClick={handleHideLogsPanel}
          icon={<CloseOutlined />}
          shape='circle'
          type='ghost'
        />
      </div>

      <div className='logs-panel-logs'>
        {logs.map(() => {
          return null;
        })}
      </div>
    </div>
  );
};

LogsPanel.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.shape({})),
  handleHideLogsPanel: PropTypes.func,
  handleOpenLogsModal: PropTypes.func,
};

LogsPanel.defaultProps = {
  logs: [],
  handleHideLogsPanel: undefined,
  handleOpenLogsModal: undefined,
};

export default LogsPanel;
