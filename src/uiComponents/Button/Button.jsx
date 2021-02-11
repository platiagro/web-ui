// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIB COMPONENTS
import { Button as AntButton } from 'antd';

/**
 * Simple button based in Ant Design button.
 *
 * @component
 *
 * @param {object} props Component props
 *
 * @returns {Button} Component
 *
 * @example
 * // Button child node content
 * const children = 'Button child';
 * // Button click handler
 * const handleClick = () => alert('Click!');
 * // Button is loading
 * const isLoading = false;
 * // Button is disabled
 * const isDisabled = false;
 * // Button type
 * const type = 'primary';
 * // Button shape
 * const shape = 'round';
 *
 * // rendering component
 * return (
 *   <Button
 *     disabled={isDisabled}
 *     icon={icon}
 *     loading={isLoading}
 *     shape={shape}
 *     type={type}
 *     handleClick={handleClick}
 *   >
 *     {children}
 *   </Button>
 * );
 */
const Button = (props) => {
  // destructuring props
  const {
    children,
    isDisabled,
    icon,
    isLoading,
    shape,
    type,
    handleClick,
    color,
  } = props;

  // rendering component
  return (
    <AntButton
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

// PROP TYPES
Button.propTypes = {
  /** Button child node content */
  children: PropTypes.node.isRequired,
  /** Button icon node content */
  icon: PropTypes.node,
  /** Button click handler */
  handleClick: PropTypes.func,
  /** Button is loading */
  isLoading: PropTypes.bool.isRequired,
  /** Button is disabled */
  isDisabled: PropTypes.bool.isRequired,
  /** Button type */
  type: PropTypes.string.isRequired,
  /** Button shape */
  shape: PropTypes.string,
  /** Button custom color */
  color: PropTypes.string,
};

// DEFAULT PROPS
Button.defaultProps = {
  /** Button icon node content */
  icon: undefined,
  /** Button shape */
  shape: undefined,
  /** Button custom color */
  color: undefined,
};

// EXPORT DEFAULT
export default Button;
