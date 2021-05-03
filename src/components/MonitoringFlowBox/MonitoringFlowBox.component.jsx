import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckCircleFilled,
  ClockCircleFilled,
  LoadingOutlined,
  FundOutlined,
} from '@ant-design/icons';

import './MonitoringFlowBox.style.less';

const statusFlowBox = {
  pending: <ClockCircleFilled />,
  loading: <LoadingOutlined />,
  success: <CheckCircleFilled style={{ color: '#389E0D' }} />,
  active: <div className='monitoring-flow-box-status-icon active' />,
  disable: <div className='monitoring-flow-box-status-icon disable' />,
  default: null,
};

const MonitoringFlowBox = (props) => {
  const { title, status, onClick } = props;
  const statusIcon = statusFlowBox[status];

  return (
    <button className='monitoring-flow-box' onClick={onClick}>
      <div className='monitoring-flow-box-circle' />
      <div className='monitoring-flow-box-line' />
      <div className='monitoring-flow-box-content'>
        <div className='monitoring-flow-box-icon'>
          <FundOutlined />
        </div>
        <div className='monitoring-flow-box-title'>{title}</div>
        <div className='monitoring-flow-box-status'>{statusIcon}</div>
      </div>
    </button>
  );
};

MonitoringFlowBox.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    undefined,
    'pending',
    'loading',
    'success',
    'active',
    'disable',
    'default',
  ]),
  onClick: PropTypes.func,
};

MonitoringFlowBox.defaultProps = {
  status: undefined,
  onClick: undefined,
};

export default MonitoringFlowBox;
