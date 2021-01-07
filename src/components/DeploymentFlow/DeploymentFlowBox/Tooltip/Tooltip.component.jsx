import PropTypes from 'prop-types';
import React from 'react';
import { Tooltip as AntTooltip } from 'antd';

import {
  CheckCircleFilled,
  ClockCircleFilled,
  ExclamationCircleFilled,
  StopOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import './Tooltip.style.less';

const tooltipConfig = {
  Running: {
    title: 'Tarefa em execução',
    icon: <LoadingOutlined className='icon running' spin />,
  },
  Pending: {
    title: 'Tarefa pendente',
    icon: <ClockCircleFilled className='icon pending' />,
  },
  Succeeded: {
    title: 'Tarefa executada com sucesso',
    icon: <CheckCircleFilled className='icon succeeded' />,
  },
  Failed: {
    title: 'Tarefa executada com falha',
    icon: <ExclamationCircleFilled className='icon failed' />,
  },
  default: {
    title: 'Tarefa interrompida',
    icon: <StopOutlined className='icon default' />,
  },
};

/**
 * DeploymentFlowBox tooltip
 */
function Tooltip(props) {
  const { status } = props;

  const { title, icon } = tooltipConfig[status] || tooltipConfig['default'];

  return !status || status === 'Loading' ? null : (
    <div className='deploymentFlowBox__tooltip'>
      <AntTooltip placement='right' title={title}>
        {icon}
      </AntTooltip>
    </div>
  );
}

Tooltip.propTypes = {
  status: PropTypes.oneOf(['', 'Running', 'Pending', 'Succeeded', 'Failed']),
};

Tooltip.defaultProps = {
  status: '',
};

export default Tooltip;
