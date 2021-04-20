import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Tooltip } from 'antd';
import {
  CloseOutlined,
  ExpandOutlined,
  AlertOutlined,
} from '@ant-design/icons';

import LogTypeTags from 'components/LogTypeTags';
import LogListItem from 'components/LogListItem';
import Placeholder from 'components/Placeholder';

import './styles.less';

const LogsPanel = ({ logs, handleHideLogsPanel, handleOpenLogsModal }) => {
  const [isErrorTagSelected, setIsErrorTagSelected] = useState(true);
  const [isInfoTagSelected, setIsInfoTagSelected] = useState(true);
  const [isDebugTagSelected, setIsDebugTagSelected] = useState(true);

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

        {!!handleOpenLogsModal && (
          <Tooltip color='black' placement='bottom' title='Maximizar'>
            <Button
              className='logs-panel-toolbar-button'
              onClick={handleOpenLogsModal}
              icon={<ExpandOutlined />}
              shape='circle'
              type='ghost'
            />
          </Tooltip>
        )}

        <Tooltip color='black' placement='bottom' title='Fechar'>
          <Button
            className='logs-panel-toolbar-button'
            onClick={handleHideLogsPanel}
            icon={<CloseOutlined />}
            shape='circle'
            type='ghost'
          />
        </Tooltip>
      </div>

      {logs.length > 0 && (
        <div className='logs-panel-logs'>
          {logs.map((log) => {
            return (
              <LogListItem
                key={log.uuid}
                title={log.title}
                text={log.message}
                type={log.type || undefined}
              />
            );
          })}
        </div>
      )}

      {logs.length === 0 && (
        <Placeholder
          className='logs-panel-placeholder'
          iconComponent={<AlertOutlined />}
          message='Não Existem Erros ou Mensagens'
        />
      )}
    </div>
  );
};

LogsPanel.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      type: PropTypes.string,
      title: PropTypes.string,
      message: PropTypes.string,
    })
  ),
  handleHideLogsPanel: PropTypes.func.isRequired,
  handleOpenLogsModal: PropTypes.func,
};

LogsPanel.defaultProps = {
  logs: [],
  handleOpenLogsModal: undefined,
};

export default LogsPanel;
