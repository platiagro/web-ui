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

/**
 * DeploymentFlowBox tooltip
 */
function Tooltip(props) {
  const { status } = props;

  const statusClass = status?.toLowerCase() || '';
  const tooltipIconClassName = `icon ${statusClass}`;

  const tooltipConfig = {
    Running: {
      title: 'Tarefa em execução',
      icon: <LoadingOutlined className={tooltipIconClassName} spin />,
    },
    Pending: {
      title: 'Tarefa pendente',
      icon: <ClockCircleFilled className={tooltipIconClassName} />,
    },
    Succeeded: {
      title: 'Tarefa executada com sucesso',
      icon: <CheckCircleFilled className={tooltipIconClassName} />,
    },
    Failed: {
      title: 'Tarefa executada com falha',
      icon: <ExclamationCircleFilled className={tooltipIconClassName} />,
    },
    Interrupted: {
      title: 'Tarefa interrompida',
      icon: <StopOutlined className={tooltipIconClassName} />,
    },
    Waiting: {
      title: 'Tarefa aguardando dados',
      icon: <div className={`${tooltipIconClassName} customIcon`} />,
    },
    Ready: {
      title: 'Tarefa com dados recebidos',
      icon: <div className={`${tooltipIconClassName} customIcon`} />,
    },
    default: {
      title: '',
      icon: undefined,
    },
  };

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
  status: PropTypes.oneOf([
    '',
    'Running',
    'Pending',
    'Succeeded',
    'Failed',
    'Interrupted',
    'Waiting',
    'Ready',
  ]),
};

Tooltip.defaultProps = {
  status: '',
};

export default Tooltip;
