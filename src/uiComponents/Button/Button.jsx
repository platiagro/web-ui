import React from 'react';
import PropTypes from 'prop-types';

import { Button as AntButton } from 'antd';

const Button = ({
  children,
  isDisabled,
  icon,
  isLoading,
  shape,
  type,
  handleClick,
  color,
  className,
}) => {
  return (
    <AntButton
      className={className}
      disabled={isDisabled}
      icon={icon}
      loading={isLoading}
      shape={shape}
      type={type}
      onClick={handleClick}
      style={color ? { backgroundColor: color, borderColor: color } : {}}
    >
      {children}
    </AntButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
  handleClick: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  shape: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  icon: undefined,
  shape: undefined,
  color: undefined,
  className: undefined,
};

export default Button;
