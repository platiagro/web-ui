// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIB COMPONENTS
import { Icon, Tooltip } from 'antd';

/**
 * That displays an icon that when hovered displays information (tooltip).
 *
 * The icon can be question type or info type.
 *
 * The tooltip information can be placed above (default) or below icon.
 *
 * The tooltip information is a text.
 *
 * @param {object} props Component props
 * @returns {TooltipTip} Component
 * @component
 * @example
 * // tooltip text
 * const tooltipText = 'This is a tip text!';
 * // icon type
 * const iconType = 'question';
 * // tooltip below the icon
 * const isTooltipBelow = false;
 *
 * return (
 *  <div style={{ backgroundColor: "#333", display: "flex", width: '100%', height: '300px'}}>
 *    <TooltipTip
 *      tooltipText={tooltipText}
 *      iconType={iconType}
 *      isTooltipBelow={isTooltipBelow}
 *    />
 *  </div>
 * );
 *
 */
const TooltipTip = (props) => {
  // destructuring props
  const { isTooltipBelow, tooltipText, iconType } = props;

  // rendering component
  return (
    <Tooltip
      placement={isTooltipBelow ? 'bottomRight' : 'topRight'}
      title={tooltipText}
      style={{ margin: '0', padding: '0' }}
      trigger='hover'
    >
      <Icon
        type={`${iconType}-circle`}
        style={{ lineHeight: '0', margin: '0', padding: '0' }}
      />
    </Tooltip>
  );
};

// PROP TYPES
TooltipTip.propTypes = {
  /** Show tooltip below the icon */
  isTooltipBelow: PropTypes.bool.isRequired,
  /** Tooltip information text */
  tooltipText: PropTypes.string.isRequired,
  /** Icon type */
  iconType: PropTypes.oneOf(['question', 'info']).isRequired,
};

// EXPORT DEFAULT
export default TooltipTip;
