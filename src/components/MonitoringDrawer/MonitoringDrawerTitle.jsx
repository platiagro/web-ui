import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const MonitoringDrawerTitle = ({
  deploymentName,
  handleDownloadAllFigures,
}) => {
  const getDrawerTitle = useCallback(() => {
    const trimmedDeploymentName = deploymentName?.trim() || '';
    return ['Teste do Monitoramento', '|', trimmedDeploymentName].join(' ');
  }, [deploymentName]);

  return (
    <div className='monitoring-drawer-header'>
      <div className='monitoring-drawer-header-title'>{getDrawerTitle()}</div>

      {/* eslint-disable-next-line sonarjs/no-redundant-boolean */}
      {false && ( // TODO: Exibe botão quando ele funcionar
        <Tooltip title='Faz download dos resultados exibidos'>
          <Button
            className='monitoring-drawer-header-download-button'
            shape='round'
            type='primary-inverse'
            icon={<DownloadOutlined />}
            onClick={handleDownloadAllFigures}
          >
            <span className='monitoring-drawer-header-download-text'>
              Fazer Download
            </span>
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

MonitoringDrawerTitle.propTypes = {
  deploymentName: PropTypes.string,
  handleDownloadAllFigures: PropTypes.func,
};

MonitoringDrawerTitle.defaultProps = {
  deploymentName: '',
  handleDownloadAllFigures: undefined,
};

export default MonitoringDrawerTitle;
