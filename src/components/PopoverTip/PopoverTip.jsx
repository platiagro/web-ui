// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIB COMPONENTS
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Popover, Button } from 'antd';

/**
 * That displays an icon that when hovered displays information (popover).
 *
 * The icon can be question type or info type.
 *
 * The popover information can be placed above (default) or below icon.
 *
 * The popover information has a title and text.
 *
 * @param {object} props Component props
 * @returns {PopoverTip} Component
 * @component
 * @example
 * // popover title
 * const popoverTitle = 'This is a tip title!';
 * // popover text
 * const popoverText = 'This is a tip text!';
 * // icon type
 * const iconType = 'question';
 * // popover below the icon
 * const isPopoverBelow = false;
 *
 * return (
 *  <div style={{ backgroundColor: "#333", display: "flex", width: '100%', height: '300px'}}>
 *    <PopoverTip
 *      popoverTitle={popoverTitle}
 *      popoverText={popoverText}
 *      iconType={iconType}
 *      isPopoverBelow={isPopoverBelow}
 *    />
 *  </div>
 * );
 *
 */
const PopoverTip = (props) => {
  // destructuring props
  const { isPopoverBelow, popoverTitle, popoverText, iconType } = props;

  const popOverIconStyle = { lineHeight: '0', margin: '0', padding: '0' };
  let popOverIcon;
  if (iconType === 'info') {
    popOverIcon = <InfoCircleOutlined style={popOverIconStyle} />;
  } else {
    popOverIcon = <QuestionCircleOutlined style={popOverIconStyle} />;
  }

  // rendering component
  return (
    <Popover
      placement={isPopoverBelow ? 'bottomRight' : 'topRight'}
      content={<p>{popoverText}</p>}
      title={popoverTitle}
      style={{ margin: '0', padding: '0' }}
      trigger='hover'
    >
      <Button
        type='link'
        style={{ height: 'auto', color: '#595959', margin: '0', padding: '0' }}
      >
        {popOverIcon}
      </Button>
    </Popover>
  );
};

// PROP TYPES
PopoverTip.propTypes = {
  /** Show popover below the icon */
  isPopoverBelow: PropTypes.bool.isRequired,
  /** Popover information title */
  popoverTitle: PropTypes.string.isRequired,
  /** Popover information text */
  popoverText: PropTypes.string.isRequired,
  /** Icon type */
  iconType: PropTypes.oneOf(['info', 'question']).isRequired,
};

// EXPORT DEFAULT
export default PopoverTip;
