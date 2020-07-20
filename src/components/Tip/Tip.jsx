// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIB COMPONENTS
import { Icon, Popover, Button } from 'antd';

/**
 * That displays an icon that when clicked displays information.
 *
 * The icon can be question type or info type.
 *
 * The popover information can be placed above (default) or below icon.
 *
 * The popover information has a title and text.
 *
 * @param {object} props Component props
 * @returns {Tip} Component
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
 *    <Tip
 *      popoverTitle={popoverTitle}
 *      popoverText={popoverText}
 *      iconType={iconType}
 *      isPopoverBelow={isPopoverBelow}
 *    />
 *  </div>
 * );
 *
 */
const Tip = (props) => {
  // destructuring props
  const { isPopoverBelow, popoverTitle, popoverText, iconType } = props;

  // rendering component
  return (
    <Popover
      placement={isPopoverBelow ? 'bottom' : 'top'}
      content={<p>{popoverText}</p>}
      title={popoverTitle}
    >
      <Button type='link' style={{ color: '#595959' }}>
        <Icon type={`${iconType}-circle`} />
      </Button>
    </Popover>
  );
};

// PROP TYPES
Tip.propTypes = {
  /** Show popover below the icon */
  isPopoverBelow: PropTypes.bool.isRequired,
  /** Popover information title */
  popoverTitle: PropTypes.string.isRequired,
  /** Popover information text */
  popoverText: PropTypes.string.isRequired,
  /** Icon type */
  iconType: PropTypes.oneOf(['question', 'info']).isRequired,
};

// EXPORT DEFAULT
export default Tip;
