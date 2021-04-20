import React, { useMemo, useState } from 'react';
import { Button, Divider, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import {
  CloseOutlined,
  ExpandOutlined,
  AlertOutlined,
} from '@ant-design/icons';

import LogTypeTags from 'components/LogTypeTags';
import LogListItem from 'components/LogListItem';
import Placeholder from 'components/Placeholder';

import LogsPanelSkeleton from './LogsPanelSkeleton';

import './styles.less';

const LogsPanel = ({
  style,
  logs,
  isLoading,
  handleHideLogsPanel,
  handleOpenLogsModal,
}) => {
  const [isErrorTagSelected, setIsErrorTagSelected] = useState(true);
  const [isInfoTagSelected, setIsInfoTagSelected] = useState(true);
  const [isDebugTagSelected, setIsDebugTagSelected] = useState(true);

  const filteredLogs = useMemo(() => {
    return logs.filter(({ type }) => {
      const isErrorAndCanShowError = isErrorTagSelected && type === 'ERROR';
      const isInfoAndCanShowInfo = isInfoTagSelected && type === 'INFO';
      const isDebugAndCanShowDebug = isDebugTagSelected && type === 'DEBUG';

      return (
        isErrorAndCanShowError || isInfoAndCanShowInfo || isDebugAndCanShowDebug
      );
    });
  }, [isDebugTagSelected, isErrorTagSelected, isInfoTagSelected, logs]);

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
    <div style={style} className='logs-panel'>
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

      {!isLoading && filteredLogs.length > 0 && (
        <div className='logs-panel-logs'>
          {filteredLogs.map((log) => {
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

      {!isLoading && filteredLogs.length === 0 && (
        <Placeholder
          className='logs-panel-placeholder'
          iconComponent={<AlertOutlined />}
          message='Não Há Nada Para Exibir'
        />
      )}

      {isLoading && <LogsPanelSkeleton />}
    </div>
  );
};

LogsPanel.propTypes = {
  style: PropTypes.object,
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      type: PropTypes.string,
      title: PropTypes.string,
      message: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
  handleHideLogsPanel: PropTypes.func.isRequired,
  handleOpenLogsModal: PropTypes.func,
};

LogsPanel.defaultProps = {
  style: undefined,
  logs: [],
  isLoading: false,
  handleOpenLogsModal: undefined,
};

export default LogsPanel;
