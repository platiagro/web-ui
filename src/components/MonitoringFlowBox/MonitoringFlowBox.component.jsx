/* eslint-disable */

// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Handle } from 'react-flow-renderer';

// UI LIBS
import {
  CheckCircleFilled,
  ClockCircleFilled,
  LoadingOutlined,
  FundOutlined,
} from '@ant-design/icons';

// STYLES
import './MonitoringFlowBox.style.less';

const statusTable = {
  pending: <ClockCircleFilled />,
  loading: <LoadingOutlined />,
  success: <CheckCircleFilled style={{ color: '#389E0D' }} />,
  active: <div className='statusIcon active' />,
  disable: <div className='statusIcon disable' />,
  default: null,
};

/**
 * Componente de caixa (operador) de monitoramento.
 */
function MonitoringFlowBox(props) {
  const { title, status } = props;

  const statusIcon = statusTable[status];

  // RENDER
  return (
    <div className='monitoringFlowBox'>
      <div className='circleDetail' />
      <div className='lineDetail' />
      <div className='box'>
        <div className='icon'>
          <FundOutlined />
        </div>
        <div className='title'>{title}</div>
        <div className='status'>{statusIcon}</div>
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
  ]),
};

MonitoringFlowBox.defaultProps = {
  status: undefined,
};

// EXPORT
export default MonitoringFlowBox;
