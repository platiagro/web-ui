import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Divider, Modal } from 'antd';
import { AlertOutlined } from '@ant-design/icons';

import { LOG_TYPES } from 'configs';
import { useToggleState } from 'hooks';
import LogTypeTags from 'components/LogTypeTags';
import LogListItem from 'components/LogListItem';
import Placeholder from 'components/Placeholder';

import './styles.less';

const LogsModal = ({ isShowing, handleHideModal, logs }) => {
  const [isErrorTagSelected, handleToggleErrorTag] = useToggleState(true);
  const [isInfoTagSelected, handleToggleInfoTag] = useToggleState(true);
  const [isDebugTagSelected, handleToggleDebugTag] = useToggleState(true);

  const filteredLogs = useMemo(() => {
    return logs.filter(({ type }) => {
      const isErrorLog = type === LOG_TYPES.ERROR;
      const isInfoLog = type === LOG_TYPES.INFO;
      const isDebugLog = type === LOG_TYPES.DEBUG;

      const isErrorAndCanShowErrorLogs = isErrorTagSelected && isErrorLog;
      const isInfoAndCanShowInfoLogs = isInfoTagSelected && isInfoLog;
      const isDebugAndCanShowDebugLogs = isDebugTagSelected && isDebugLog;

      return (
        isErrorAndCanShowErrorLogs ||
        isInfoAndCanShowInfoLogs ||
        isDebugAndCanShowDebugLogs
      );
    });
  }, [isDebugTagSelected, isErrorTagSelected, isInfoTagSelected, logs]);

  return (
    <Modal
      bodyStyle={{ padding: '0' }}
      wrapClassName='logs-modal'
      onCancel={handleHideModal}
      onOk={handleHideModal}
      visible={isShowing}
      footer={null}
      width={1000}
      title={
        <div className='logs-modal-header'>
          <div className='logs-modal-header-title'>
            Histórico de Erros e Mensagens
          </div>

          <Divider className='logs-modal-divider' type='vertical' />

          <LogTypeTags
            isErrorTagSelected={isErrorTagSelected}
            isInfoTagSelected={isInfoTagSelected}
            isDebugTagSelected={isDebugTagSelected}
            handleToggleErrorTag={handleToggleErrorTag}
            handleToggleInfoTag={handleToggleInfoTag}
            handleToggleDebugTag={handleToggleDebugTag}
          />
        </div>
      }
      centered
    >
      {filteredLogs.length > 0 && (
        <div>
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

      {filteredLogs.length === 0 && (
        <Placeholder
          className='logs-modal-placeholder'
          iconComponent={<AlertOutlined />}
          message='Não Há Nada Para Exibir'
        />
      )}
    </Modal>
  );
};

LogsModal.propTypes = {
  isShowing: PropTypes.bool,
  handleHideModal: PropTypes.func,
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      type: PropTypes.string,
      title: PropTypes.string,
      message: PropTypes.string,
    })
  ),
};

LogsModal.defaultProps = {
  isShowing: false,
  handleHideModal: undefined,
  logs: [],
};

export default LogsModal;
