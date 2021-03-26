/* eslint-disable */

// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import {
  CheckCircleFilled,
  ClockCircleFilled,
  LoadingOutlined,
  FundOutlined,
} from '@ant-design/icons';

// STYLES
import './MonitoringFlowBox.style.less';

const statusFlowBox = {
  pending: <ClockCircleFilled />,
  loading: <LoadingOutlined />,
  success: <CheckCircleFilled style={{ color: '#389E0D' }} />,
  active: <div className='monitoring-flow-box-status-icon active' />,
  disable: <div className='monitoring-flow-box-status-icon disable' />,
  default: null,
};

/**
 * Componente de caixa (operador) de monitoramento.
 */
function MonitoringFlowBox(props) {
  const { title, status, onClick } = props;

  const statusIcon = statusFlowBox[status];

  // RENDER
  return (
    <div className='monitoring-flow-box' onClick={onClick}>
      <div className='monitoring-flow-box-circle' />
      <div className='monitoring-flow-box-line' />
      <div className='monitoring-flow-box-content'>
        <div className='monitoring-flow-box-icon'>
          <FundOutlined />
        </div>
        <div className='monitoring-flow-box-title'>{title}</div>
        <div className='monitoring-flow-box-status'>{statusIcon}</div>
      </div>
    </div>
  );
}

MonitoringFlowBox.propTypes = {
  /** Título do operador (caixa) */
  title: PropTypes.string.isRequired,
  /** Estado do operador */
  status: PropTypes.oneOf([
    undefined,
    'pending',
    'loading',
    'success',
    'active',
    'disable',
    'default',
  ]),
  /** Evento de click */
  onClick: PropTypes.func
};

MonitoringFlowBox.defaultProps = {
  status: undefined,
  onClick: undefined,
};

// EXPORT
export default MonitoringFlowBox;
