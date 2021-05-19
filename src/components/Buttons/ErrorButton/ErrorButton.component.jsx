import React from 'react';
import PropTypes from 'prop-types';
import { BugOutlined } from '@ant-design/icons';

import './style.less';

const ErrorButton = ({ onClick, disabled, active }) => {
  const getClassName = () => {
    if (disabled) return 'error-button-disabled';
    else if (active) return 'error-button-active';
    return 'error-button';
  };

  return (
    <button className={getClassName()} onClick={onClick} disabled={disabled}>
      <BugOutlined />
      Error
    </button>
  );
};

ErrorButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.boolean,
  disabled: PropTypes.boolean,
};

ErrorButton.defaultProps = {
  active: false,
  disabled: false,
};

export default ErrorButton;
