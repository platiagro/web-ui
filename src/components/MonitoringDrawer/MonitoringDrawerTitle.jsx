import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { DownloadOutlined } from '@ant-design/icons';

const MonitoringDrawerTitle = ({ deploymentName, handleDownload }) => {
  const getDrawerTitle = useCallback(() => {
    const trimmedDeploymentName = deploymentName?.trim() || '';
    return ['Teste do Monitoramento', '|', trimmedDeploymentName].join(' ');
  }, [deploymentName]);

  return (
    <div className='monitoring-drawer-header'>
      <div className='monitoring-drawer-header-title'>{getDrawerTitle()}</div>

      <Button
        className='monitoring-drawer-header-download-button'
        shape='round'
        type='primary-inverse'
        icon={<DownloadOutlined />}
        handleClick={handleDownload}
      >
        <span className='monitoring-drawer-header-download-text'>
          Fazer Download
        </span>
      </Button>
    </div>
  );
};

MonitoringDrawerTitle.propTypes = {
  deploymentName: PropTypes.string,
  handleDownload: PropTypes.func,
};

MonitoringDrawerTitle.defaultProps = {
  deploymentName: '',
  handleDownload: undefined,
};

export default MonitoringDrawerTitle;
