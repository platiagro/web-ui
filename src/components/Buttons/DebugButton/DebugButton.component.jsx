import React from 'react';
import PropTypes from 'prop-types';
import { CodeOutlined } from '@ant-design/icons';

import './style.less';

const DebugButton = ({ onClick, active, disabled }) => {
  const getClassName = () => {
    if (disabled) return 'debug-button-disabled';
    else if (active) return 'debug-button';
    return 'debug-button-active';
  };

  return (
    <button className={getClassName()} onClick={onClick} disabled={disabled}>
      <CodeOutlined />
      Debug
    </button>
  );
};

DebugButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.boolean,
  disabled: PropTypes.boolean,
};

DebugButton.defaultProps = {
  active: false,
  disabled: false,
};

export default DebugButton;
