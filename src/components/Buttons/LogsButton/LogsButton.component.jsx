import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Badge } from 'antd';
import { AlertOutlined } from '@ant-design/icons';

import './style.less';

const LogsButton = ({
  className,
  buttonClassName,
  onClick,
  errorCount = 0,
  isActive = false,
  isDisabled = false,
}) => {
  const tooltipTitle = useMemo(() => {
    return isActive
      ? 'Ocultar histórico de erros'
      : 'Exibir histórico de erros';
  }, [isActive]);

  const composedButtonClassName = useMemo(() => {
    const classNamesArray = ['logs-button'];
    if (isDisabled) classNamesArray.push('logs-button-disabled');
    else if (isActive) classNamesArray.push('logs-button logs-button-active');
    classNamesArray.push(buttonClassName);
    return classNamesArray.join(' ');
  }, [isActive, buttonClassName, isDisabled]);

  return (
    <Badge className={className} count={errorCount}>
      <Tooltip
        color='black'
        placement='left'
        title={tooltipTitle}
        disabled={isDisabled}
        overlayStyle={{ display: isDisabled ? 'none' : undefined }}
      >
        <button className={composedButtonClassName} onClick={onClick}>
          <AlertOutlined />
        </button>
      </Tooltip>
    </Badge>
  );
};

LogsButton.propTypes = {
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  onClick: PropTypes.func,
  errorCount: PropTypes.number,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default LogsButton;
