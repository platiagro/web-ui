import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tooltip as AntTooltip } from 'antd';

import {
  StopOutlined,
  LoadingOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import './Tooltip.style.less';

const Tooltip = ({ status }) => {
  const tooltipIconClassName = useMemo(() => {
    const statusClass = status?.toLowerCase() || '';
    return `icon ${statusClass}`;
  }, [status]);

  const { title, icon } = useMemo(() => {
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
      Default: {
        title: '',
        icon: undefined,
      },
    };

    return tooltipConfig[status] || tooltipConfig['Default'];
  }, [status, tooltipIconClassName]);

  return !status || status === 'Loading' ? null : (
    <div className='deploymentFlowBox__tooltip'>
      <AntTooltip placement='right' title={title}>
        {icon}
      </AntTooltip>
    </div>
  );
};

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
    'Setted up',
  ]),
};

Tooltip.defaultProps = {
  status: '',
};

export default Tooltip;
