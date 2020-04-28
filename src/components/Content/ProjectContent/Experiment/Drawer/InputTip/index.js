// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Popover } from 'antd';

/**
 * Input Tip.
 * This component is responsible for displaying input tip.
 */
const InputTip = ({ tip }) => (
  // popover component
  <Popover
    overlayStyle={{
      width: 150,
    }}
    content={tip}
    trigger='click'
  >
    {/* icon component */}
    <Icon style={{ marginLeft: 10 }} type='question-circle' />
  </Popover>
);

// PROP TYPES
InputTip.propTypes = {
  /** input tip string */
  tip: PropTypes.string.isRequired,
};

// EXPORT
export default InputTip;
